import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

type PovoverDateProps = {
  title: string;
  isDisabled?: boolean;
};
export const PopoverDate = ({ title, isDisabled }: PovoverDateProps) => {
  const [openLeaveFrom, setOpenLeaveFrom] = useState(false);
  return (
    <div className={cn("w-full min-h-[70px]", isDisabled && "hidden")}>
      <Popover open={openLeaveFrom} onOpenChange={setOpenLeaveFrom}>
        <PopoverTrigger className="" asChild>
          <Button
            variant={"ghost"}
            size={"none"}
            className="font-normal text-muted-foreground w-full h-full"
          >
            <span>{title}</span>
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            numberOfMonths={1}
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
