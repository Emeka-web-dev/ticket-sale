import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore } from "@/lib/use-modal-store";
import { SearchIcon } from "lucide-react";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { PopoverDate } from "../popover-date";
import { PopoverItem } from "../popover-item";
import { cn } from "@/lib/utils";

type Status = {
  value: string;
  label: string;
};

const ViewTicketModal = () => {
  const state = useModalStore();
  const onOpen = state.isOpen && state.type === "viewTicket";

  const [startLocation, setStartLocation] = React.useState<Status | null>(null);
  const [endLocation, setEndLocation] = React.useState<Status | null>(null);
  const [activeTrip, setActiveTrip] = React.useState<"round-trip" | "one-way">(
    "round-trip"
  );
  return (
    <Dialog open={onOpen} onOpenChange={state.setOpen}>
      <DialogContent className="max-w-6xl mx-auto  grid gap-y-10 p-5 mb-6">
        <DialogHeader>
          <DialogTitle className="text-center grid gap-y-5">
            <h1 className="text-center text-3xl">Purchase Ticket</h1>
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="flex items-center gap-x-5 my-4">
            <span
              className="flex items-center space-x-1"
              onChange={() => setActiveTrip("round-trip")}
            >
              <input
                type="radio"
                name="trip"
                value={activeTrip}
                checked={activeTrip === "round-trip"}
                className="cursor-pointer"
              />
              <Label className="text-base" htmlFor="text">
                Round-trip
              </Label>
            </span>
            <span
              className="flex items-center space-x-1"
              onChange={() => setActiveTrip("one-way")}
            >
              <input
                type="radio"
                name="trip"
                value={activeTrip}
                checked={activeTrip === "one-way"}
                className="cursor-pointer"
              />
              <Label className="text-base" htmlFor="text">
                One-way
              </Label>
            </span>
          </div>
          <div className="full w-full">
            <div className=" grid items-center justify-center mx-auto sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full gap-3">
              {/* leave from  */}
              <PopoverItem
                title="Leaving from"
                setLocation={setStartLocation}
                location={startLocation}
              />
              {/* going to  */}
              <PopoverItem
                title="Going to"
                location={endLocation}
                setLocation={setEndLocation}
              />
              {/* date setting */}
              <div
                className={cn(
                  "grid grid-cols-2 h-full border shadow rounded-md",
                  activeTrip === "one-way" && "grid-cols-1"
                )}
              >
                <PopoverDate title="Departure date" />
                <PopoverDate
                  isDisabled={activeTrip === "one-way"}
                  title="Return date"
                />
              </div>{" "}
              {/* number of passengers */}
              <div className="grid w-full min-h-[70px]  items-center gap-1.5 border shadow rounded-md p-1">
                <Label className="pl-2 text-base text-gray-600" htmlFor="email">
                  Number of passengers
                </Label>
                <Input
                  type="number"
                  defaultValue={1}
                  min={1}
                  className="!border-none !outline-none !shadow-none focus:!ring-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 lg:grid-cols-1 lg:justify-items-end h-[70px] mt-3 gap-3">
              <Button className="h-[70px] min-w-[267px] col-span-4 lg:col-auto w-full lg:w-auto">
                <SearchIcon className="!h-5 !w-5 text-3xl" />
                <span className="text-lg">Search</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))]
export default ViewTicketModal;
