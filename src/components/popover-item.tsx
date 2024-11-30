"use client";
import axios from "axios";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
import { LocationData } from "../../typings";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type PopoverItemProps = {
  title: string;
  location: LocationData | null;
  setLocation: (location: LocationData | null) => void;
};
export const PopoverItem = ({
  location,
  title,
  setLocation,
}: PopoverItemProps) => {
  const [openLeaveFrom, setOpenLeaveFrom] = useState(false);
  const [locationData, setLocationData] = useState<LocationData[]>([]);

  const onFetchData = useCallback(async () => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/getLocation",
        query: {
          location: location?.name,
        },
      });
      const response = await axios.get(url);
      setLocationData(response.data);
    } catch {
      return null;
    }
  }, [location]);

  useEffect(() => {
    setLocation(null);
  }, [setOpenLeaveFrom]);

  useEffect(() => {
    if (location && location.name.length >= 2) {
      onFetchData();
    }
  }, [location, onFetchData]);

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
              <div className="capitalize my-3 w-full h-full grid grid-flow-col auto-cols-max rounded-sm items-center">
                <span className="text-sm">{location?.name}</span>
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
            <CommandInput
              placeholder="Change status..."
              onValueChange={(value) =>
                setLocation({ ...location!, name: value })
              }
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="px-2">
                {locationData &&
                  locationData.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.name}
                      onSelect={() => {
                        setLocation(item);
                        setOpenLeaveFrom(false);
                      }}
                    >
                      {item.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
