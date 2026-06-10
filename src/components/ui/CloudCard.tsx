import Image from "next/image";

interface CloudCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function CloudCard({ children, className = "" }: CloudCardProps) {
  return (
    <div className={`relative transition-transform duration-300 hover:-translate-y-2 ${className}`}>
      {/* Cloud image — natural aspect ratio, content overlaid on top */}
      <Image
        src="/about/cloud2.png"
        alt=""
        width={520}
        height={320}
        className="w-full h-auto"
        aria-hidden
      />
      {/* Content centred within the cloud body */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 pb-4 pt-6">
        {children}
      </div>
    </div>
  );
}
