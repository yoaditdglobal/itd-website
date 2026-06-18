"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

/**
 * Renders the global site chrome (nav + footer + chat) around the page, EXCEPT
 * on immersive routes (e.g. the standalone cinematic landing page at /rc), which
 * are shown full-bleed with no nav/footer/chat and no top padding.
 */
const IMMERSIVE = ["/rc"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const immersive = IMMERSIVE.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (immersive) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
