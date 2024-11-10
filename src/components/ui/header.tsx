"use client";
import Link from "next/link";
import { Button } from "./button";
import { Menu, ShoppingCart } from "lucide-react";
import { useModalStore } from "@/lib/use-modal-store";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Schedule", href: "/shedule" },
  { name: "Team", href: "/team" },
  { name: "FAQ", href: "/faq" },
];
export const Header = () => {
  const setOpen = useModalStore((state) => state.setOpen);
  return (
    <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
      {/* Logo */}
      <Link href="/">Logo</Link>

      {/* Menu */}
      <nav className="hidden md:flex space-x-4 text-lg font-semibold">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Ticket */}
      <div className="flex items-center space-x-4">
        <Button asChild className="rounded-full">
          <Link href="/tickets">
            Buy Ticket <ShoppingCart className="size-4 ml-2" />
          </Link>
        </Button>

        {/* Hamburger Menu */}
        <Button size="icon" className="md:hidden" onClick={() => setOpen(true)}>
          <Menu className="size-5" />
        </Button>
      </div>
    </header>
  );
};
