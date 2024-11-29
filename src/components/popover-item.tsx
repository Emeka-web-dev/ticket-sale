import { MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

type Status = {
  value: string;
  label: string;
};
type PopoverItemProps = {
  title: string;
  location: Status | null;
  setLocation: (location: Status | null) => void;
};
export const PopoverItem = ({ location, title }: PopoverItemProps) => {
  const [openLeaveFrom, setOpenLeaveFrom] = useState(false);
  return (
    <div className="w-full min-h-[70px] items-center border shadow rounded-md flex h-full">
      <Popover open={openLeaveFrom} onOpenChange={setOpenLeaveFrom}>
        <PopoverTrigger
          className="w-full justify-start border-none shadow-none relative border h-full"
          asChild
        >
          <Button
            variant="outline"
            className="w-full justify-start text-gray-600 capitalize "
          >
            {location ? (
              <div className="capitalize my-3 w-fit grid grid-flow-col auto-cols-max p-1 rounded-sm items-center gap-1.5 bg-gray-100">
                <span className="text-sm">{location?.label}</span>
              </div>
            ) : (
              <span>{title}</span>
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
                  <span className="text-sm">{location?.label} </span>
                </div>
                <Separator className="my-4" />
              </CommandGroup>

              <div className="!grid grid-cols-3 gap-2">
                {/* {statuses.map((status) => (
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
                            ))} */}
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
