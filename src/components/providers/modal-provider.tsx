"use client";
import { useEffect, useState } from "react";
import { SidebarToggle } from "./sidebar-toggle";
import { BuyTicketModal } from "./buy-ticket-modal";
import ViewTicketModal from "./view-ticket-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <SidebarToggle />
      <BuyTicketModal />
      <ViewTicketModal />
    </>
  );
};
