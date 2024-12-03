import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

type PopoverContentProps = {
  value: DateRange;
  onChange: (value: DateRange) => void;
  activeTrip: "one-way" | "round-trip";
};

export const PopoverCalender = ({
  value,
  onChange,
  activeTrip,
}: PopoverContentProps) => {
  const handleDateSelect: SelectRangeEventHandler = (range) => {
    onChange(range!);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            id="date"
            name="dates"
            variant={"outline"}
            className={cn(
              "w-full lg:w-[300px] justify-start text-left font-normal",
              !value.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
            {value?.from ? (
              value?.to ? (
                <>
                  {format(value?.from, "LLL dd, y")} -{" "}
                  {format(value?.to, "LLL dd, y")}
                </>
              ) : (
                format(value?.from, "LLL dd, y")
              )
            ) : (
              <span>Select your dates</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          selected={value}
          defaultMonth={value.from}
          onSelect={handleDateSelect}
          numberOfMonths={activeTrip === "round-trip" ? 2 : 1}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </PopoverContent>
    </Popover>
  );
};
