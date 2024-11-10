import { useModalStore } from "@/lib/use-modal-store";
import Link from "next/link";
import { navLinks } from "../ui/header";
import { Sheet, SheetContent } from "../ui/sheet";

export const SidebarToggle = () => {
  const state = useModalStore();
  return (
    <Sheet open={state.isOpen} onOpenChange={state.setOpen}>
      <SheetContent>
        <nav className="flex flex-col space-y-3 pt-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
