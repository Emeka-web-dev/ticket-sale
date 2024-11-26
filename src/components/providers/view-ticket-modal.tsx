import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore } from "@/lib/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { CalendarIcon, SearchIcon } from "lucide-react";

// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const ViewTicketModal = () => {
  const state = useModalStore();
  const onOpen = state.isOpen && state.type === "viewTicket";

  return (
    <Dialog open={onOpen} onOpenChange={state.setOpen}>
      <DialogContent className="max-w-7xl mx-auto  grid gap-y-10 p-7">
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
        <div className="full w-full  rounded-sm ">
          <div className=" grid items-center   justify-center mx-auto  sm:grid-cols-2 grid-cols-1   md:grid-cols-[repeat(3,1fr)_auto] h-full gap-5  ">
            <div className="grid w-full h-full  items-center gap-1.5 border shadow rounded-md p-1 ">
              <Label className="pl-2 text-lg text-blue-950" htmlFor="email">
                Destination
              </Label>
              <Input
                type="email"
                className="!border-none !outline-none placeholder:text-blue-950 !shadow-none focus:!ring-0"
                id="email"
                placeholder="City,Landmark,region"
              />
            </div>
            <div className="grid w-full  h-full  items-center full  gap-1.5 border shadow rounded-md p-1">
              <Label className="pl-2 text-lg text-blue-950" htmlFor="email">
                check-in
              </Label>
              <Popover>
                <div className="w-full h-full">
                  <PopoverTrigger
                    asChild
                    className="relative w-full shadow-none hover:bg-transparent h-full bg-transparent border-none focus:outline-none"
                  >
                    <Button>
                      <span className="text-blue-950">Mon,Nov 25</span>
                      <CalendarIcon className="ml-auto text-blue-950 h-4 w-full opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </div>
              </Popover>
            </div>
            <div className="grid w-full h-full   items-center gap-1.5 border shadow rounded-md p-1">
              <Label className="pl-2 text-lg" htmlFor="email">
                Email
              </Label>
              <Input
                type="email"
                className="!border-none !outline-none !shadow-none focus:!ring-0"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="grid w-full min-w-[150px]  min-h-[70px] h-full place-content-center   gap-1.5 border shadow rounded-md ">
              <button className="grid grid-flow-col auto-cols-max h-full items-center gap-1.5">
                <SearchIcon className="text-blue-600" />
                <span className="text-blue-600 capitalize font-medium text-2xl">
                  search
                </span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))]
export default ViewTicketModal;
