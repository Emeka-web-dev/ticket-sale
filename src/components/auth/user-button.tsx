"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const UserButton = () => {
  const pathname = usePathname();
  return (
    <Button size={"lg"} asChild className="!bg-blue-950">
      <Link
        href={
          pathname?.endsWith("/auth/login") ? "/auth/signup" : "/auth/login"
        }
      >
        {pathname?.endsWith("/auth/login") ? "Sign Up" : "Log In"}
      </Link>
    </Button>
  );
};
