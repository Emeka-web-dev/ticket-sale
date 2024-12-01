import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

// type DateRange = {
//   from: Date | undefined;
//   to: Date | undefined;
// };

type PopoverContentProps = {
  field: {
    value: DateRange;
    onChange: (value: DateRange) => void; // Update the type here
  };
};

export const PopoverCalender = ({ field }: PopoverContentProps) => {
  const handleDateSelect: SelectRangeEventHandler = (range) => {
    field.onChange(range);
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
              !field.value.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
            {field.value?.from ? (
              field.value?.to ? (
                <>
                  {format(field.value?.from, "LLL dd, y")} -{" "}
                  {format(field.value?.to, "LLL dd, y")}
                </>
              ) : (
                format(field.value?.from, "LLL dd, y")
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
          selected={field.value}
          defaultMonth={field.value.from}
          onSelect={handleDateSelect}
          numberOfMonths={2}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </PopoverContent>
    </Popover>
  );
};
