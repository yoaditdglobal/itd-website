import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform",
  {
    variants: {
      variant: {
        default: "bg-accent text-white hover:bg-accent/90",
        primary: "bg-accent text-white hover:bg-accent/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-transparent border border-border text-text-primary hover:bg-bg-secondary",
        ghost: "hover:bg-accent/10 hover:text-accent",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5 rounded-lg text-sm",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
      surface: {
        light: "",
        dark: "",
      },
    },
    compoundVariants: [
      // Dark-surface overrides: button sits on bg-bg-dark / bg-bg-dark-card.
      // Primary on dark: keep brand accent fill, no change needed.
      {
        variant: "primary",
        surface: "dark",
        className: "bg-accent text-white hover:bg-accent-dark",
      },
      {
        variant: "default",
        surface: "dark",
        className: "bg-accent text-white hover:bg-accent-dark",
      },
      // Secondary on dark: transparent with white border + white text.
      {
        variant: "secondary",
        surface: "dark",
        className:
          "bg-transparent border border-white/25 text-white hover:bg-white/10 hover:border-white/40",
      },
      // Outline on dark.
      {
        variant: "outline",
        surface: "dark",
        className: "border border-white/25 bg-transparent text-white hover:bg-white/10",
      },
      // Ghost on dark.
      {
        variant: "ghost",
        surface: "dark",
        className: "text-white hover:bg-white/10",
      },
      // Link on dark.
      {
        variant: "link",
        surface: "dark",
        className: "text-white hover:text-white/80",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      surface: "light",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariantProps {
  asChild?: boolean;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, surface, asChild = false, href, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, surface, className }));
    if (href) {
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      );
    }
    const Comp = asChild ? Slot : "button";
    return <Comp className={classes} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
