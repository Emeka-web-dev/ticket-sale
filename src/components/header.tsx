"use client";
import { useModalStore } from "@/lib/use-modal-store";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "./auth/user-button";
import Logo from "./logo";
import { Button } from "./ui/button";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Schedule", href: "/shedule" },
  //   { name: "Team", href: "/team" },
  { name: "FAQ", href: "/faq" },
];
export const Header = () => {
  const pathname = usePathname();
  const setOpen = useModalStore((state) => state.setOpen);

  const isAuthroute = pathname.startsWith("/auth");
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[4rem] border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-2">
        {/* Logo */}
        <Link href="/">
          <Logo />
        </Link>

        {/* Menu */}
        {!isAuthroute && (
          <nav className="hidden md:flex space-x-4 text-lg font-semibold">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                {link.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Ticket */}
        <div className="flex items-center space-x-4">
          {/* <Button
          asChild
          className="rounded-full"
          onClick={() => setOpen(true, "ticketDialog")}
        >
          <span>
            Buy Ticket <ShoppingCart className="size-4 ml-2" />
          </span>
        </Button> */}

          <UserButton />

          {/* Hamburger Menu */}
          {!isAuthroute && (
            <Button
              size="icon"
              className="md:hidden"
              onClick={() => setOpen(true, "sidebarToggle")}
            >
              <Menu className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
