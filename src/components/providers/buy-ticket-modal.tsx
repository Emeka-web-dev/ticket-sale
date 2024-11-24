import { useModalStore } from "@/lib/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import TicketType from "../ticket-type";
import BuyerInformation from "../buyer-information";

export const BuyTicketModal = () => {
  const state = useModalStore();
  const onOpen = state.isOpen && state.type === "ticketDialog";
  return (
    <Dialog open={onOpen} onOpenChange={state.setOpen}>
      <DialogContent className="max-w-4xl  mx-auto grid gap-y-10 p-7">
        <DialogHeader>
          <DialogTitle className="text-center grid gap-y-5">
            <h1 className="text-center text-3xl">Purchase Ticket</h1>
            <div className="flex text-sm md:text-lg font-light gap-3 md:gap-5 mx-auto ">
              <h3 className="">Ticket type</h3>
              <p className="">.........</p>
              <h3 className="">Order information</h3>
              <p className="">.........</p>
              <h3 className="">Checkout</h3>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <TicketType />
          {/* <BuyerInformation /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
