"use client";
import { useModalStore } from "@/lib/use-modal-store";
import Link from "next/link";
import { navLinks } from "../header";
import { Sheet, SheetContent } from "../ui/sheet";
import { useSessionStore } from "@/hooks/user-session-store";

export const SidebarToggle = () => {
  const state = useModalStore();
  const onOpen = state.isOpen && state.type === "sidebarToggle";
  const { session } = useSessionStore();
  const dashboardPath =
    session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

  const dynamicNavLinks = [
    ...navLinks,
    { name: "Dashboard", href: dashboardPath },
  ];
  return (
    <Sheet open={onOpen} onOpenChange={state.setOpen}>
      <SheetContent>
        <nav className="flex flex-col space-y-3 pt-4">
          {dynamicNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => state.setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
