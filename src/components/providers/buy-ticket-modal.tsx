import { useModalStore } from "@/lib/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const BuyTicketModal = () => {
  const state = useModalStore();
  const onOpen = state.isOpen && state.type === "ticketDialog";
  return (
    <Dialog open={onOpen} onOpenChange={state.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
