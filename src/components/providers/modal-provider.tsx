"use client";
import { useEffect, useState } from "react";
import { SidebarToggle } from "./sidebar-toggle";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <SidebarToggle />
    </>
  );
};
