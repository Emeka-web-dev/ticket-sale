import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore } from "@/lib/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { CalendarIcon, MapPin, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

const ViewTicketModal = () => {
  const state = useModalStore();
  const onOpen = state.isOpen && state.type === "viewTicket";

  const [openLeaveFrom, setOpenLeaveFrom] = React.useState(false);
  const [openGoingTo, setOpenGoingTo] = React.useState(false);
  const [startLocation, setStartLocation] = React.useState<Status | null>(null);
  const [endLocation, setEndLocation] = React.useState<Status | null>(null);
  const [activeTrip, setActiveTrip] = React.useState("round-trip");
  return (
    <Dialog open={onOpen} onOpenChange={state.setOpen}>
      <DialogContent className="max-w-6xl mx-auto  grid gap-y-10 p-5 mb-6">
        <DialogHeader>
          <DialogTitle className="text-center grid gap-y-5">
            <h1 className="text-center text-3xl">Purchase Ticket</h1>
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="mb-3 grid grid-flow-col auto-cols-max gap-10 items-center">
            <div className="grid grid-flow-col auto-cols-max gap-2 items-center ">
              <div
                onClick={() => setActiveTrip("round-trip")}
                className={`${
                  activeTrip === "round-trip"
                    ? " border-blue-500  "
                    : "border-gray-500"
                } w-6 h-6 rounded-full border-2 flex items-center justify-center`}
              >
                <div
                  className={`${
                    activeTrip === "round-trip" ? " bg-blue-500  " : "bg-white"
                  } w-4 h-4 rounded-full   flex items-center justify-center`}
                ></div>
              </div>

              <Label className="text-base text-gray-600" htmlFor="text">
                Round-trip
              </Label>
            </div>
            <div className="grid grid-flow-col auto-cols-max gap-2 items-center">
              <div
                onClick={() => setActiveTrip("one-way")}
                className={`${
                  activeTrip === "one-way"
                    ? " border-blue-500  "
                    : "border-gray-500"
                } w-6 h-6 rounded-full border-2 flex items-center justify-center`}
              >
                <div
                  className={`${
                    activeTrip === "one-way" ? " bg-blue-500  " : "bg-white"
                  } w-4 h-4 rounded-full   flex items-center justify-center`}
                ></div>
              </div>
              <Label className="text-base text-gray-600" htmlFor="text">
                One-way
              </Label>
            </div>
          </div>
          <div className="full w-full ">
            <div className=" grid items-center   justify-center mx-auto  sm:grid-cols-2 grid-cols-1 md:grid-cols-3  lg:grid-cols-4 h-full gap-3  ">
              {/* leave from  */}
              <div className="grid w-full min-h-[70px] items-center gap-1.5 border shadow rounded-md  ">
                <div className="flex items-center h-full space-x-4">
                  <Popover open={openLeaveFrom} onOpenChange={setOpenLeaveFrom}>
                    <PopoverTrigger
                      className="w-full justify-start border-none shadow-none relative !h-full "
                      asChild
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start text-gray-600  capitalize "
                      >
                        {startLocation ? (
                          <div className="capitalize  my-3 w-fit grid grid-flow-col auto-cols-max p-1 rounded-sm items-center gap-1.5 bg-gray-100">
                            <span className="text-sm">
                              {startLocation?.label}{" "}
                            </span>
                          </div>
                        ) : (
                          <>leaving from</>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 absolute left-0"
                      side="left"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Change status..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>

                          <CommandGroup className="px-2">
                            <div className="capitalize font-semibold my-3 hover:bg-none">
                              current Location
                            </div>
                            <div className="capitalize  my-3 w-fit grid grid-flow-col auto-cols-max p-1 rounded-sm items-center gap-1.5 bg-gray-100">
                              <MapPin className="text-sm" size={16} />
                              <span className="text-sm">
                                {startLocation?.label}{" "}
                              </span>
                            </div>
                            <Separator className="my-4" />
                          </CommandGroup>

                          <div className="!grid grid-cols-3 gap-2">
                            {statuses.map((status) => (
                              <CommandItem
                                key={status.value}
                                value={status.value}
                                onSelect={(value) => {
                                  setStartLocation(
                                    statuses.find(
                                      (priority) => priority.value === value
                                    ) || null
                                  );
                                  setOpenLeaveFrom(false);
                                }}
                              >
                                {status.label}
                              </CommandItem>
                            ))}
                          </div>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {/* going to  */}
              <div className="grid w-full min-h-[70px]  items-center gap-1.5 border shadow rounded-md  ">
                <div className="flex items-center h-full space-x-4">
                  <Popover open={openGoingTo} onOpenChange={setOpenGoingTo}>
                    <PopoverTrigger
                      className="w-full justify-start border-none shadow-none relative !h-full "
                      asChild
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start text-gray-600  capitalize "
                      >
                        {endLocation ? (
                          <div className="capitalize  my-3 w-fit grid grid-flow-col auto-cols-max p-1 rounded-sm items-center gap-1.5 bg-gray-100">
                            <span className="text-sm">
                              {endLocation?.label}{" "}
                            </span>
                          </div>
                        ) : (
                          <>Going to</>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="p-0 absolute left-0"
                      side="left"
                      align="start"
                    >
                      <Command>
                        <CommandInput placeholder="Change status..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>

                          <CommandGroup className="px-2">
                            <div className="capitalize font-semibold my-3 hover:bg-none">
                              destination Location
                            </div>
                            <div className="capitalize  my-3 w-fit grid grid-flow-col auto-cols-max p-1 rounded-sm items-center gap-1.5 bg-gray-100">
                              <MapPin className="text-sm" size={16} />
                              <span className="text-sm">
                                {endLocation?.label}{" "}
                              </span>
                            </div>
                            <Separator className="my-4" />
                          </CommandGroup>

                          <div className="!grid grid-cols-3 gap-2">
                            {statuses.map((status) => (
                              <CommandItem
                                key={status.value}
                                value={status.value}
                                onSelect={(value) => {
                                  setEndLocation(
                                    statuses.find(
                                      (priority) => priority.value === value
                                    ) || null
                                  );
                                  setOpenGoingTo(false);
                                }}
                              >
                                {status.label}
                              </CommandItem>
                            ))}
                          </div>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              {/* date setting */}
              <div className="grid w-full min-w-[150px]  grid-flow-col min-h-[70px] h-full    gap-1.5 border shadow rounded-md ">
                <Popover>
                  <PopoverTrigger
                    className="h-full border-none shadow-none relative  "
                    asChild
                  >
                    <Button
                      variant={"outline"}
                      className={
                        " pl-3 text-left font-normal text-muted-foreground"
                      }
                    >
                      <span> start date</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger
                    className={`${
                      activeTrip === "one-way" ? "hidden" : ""
                    } h-full   border-none shadow-none relative `}
                    asChild
                  >
                    <Button
                      variant={"outline"}
                      className={
                        " pl-3 text-left font-normal text-muted-foreground"
                      }
                    >
                      <span>return date</span>
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
                  id="email"
                  placeholder="Email"
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
