import { Label } from "@/components/ui/label";
import { useModalStore } from "@/lib/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { format } from "date-fns";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { TicketSchema } from "../../../schemas";
import { PopoverItem } from "../popover-item";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { PopoverCalender } from "../popover-calender";
import { Input } from "../ui/input";
import { calculateDistance } from "@/utils/get-distance";
import { useSessionStore } from "@/hooks/user-session-store";
import Link from "next/link";

type DistanceData = {
  from: string;
  to: string;
  distance: number;
  date: string;
  numberOfPassenger: number;
  price: number;
  ticketType: "round-trip" | "one-way";
};
const ViewTicketModal = () => {
  const state = useModalStore();
  const session = useSessionStore((state) => state.session);
  const onOpen = state.isOpen && state.type === "viewTicket";

  const [distance, setDistance] = useState<DistanceData | null>(null);

  const [activeTrip, setActiveTrip] = useState<"round-trip" | "one-way">(
    "round-trip"
  );

  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      leavingFrom: null,
      goingTo: null,
      date: {
        from: undefined,
        to: undefined,
      },
      numberOfPassenger: 1,
    },
  });

  useEffect(() => {
    if (onOpen) {
      form.reset();
      setActiveTrip("round-trip");
      setDistance(null);
    }
  }, [onOpen, form]);

  const onSubmit = (values: z.infer<typeof TicketSchema>) => {
    const { leavingFrom, goingTo, numberOfPassenger, date } = values;
    const distance = calculateDistance(
      leavingFrom?.latitude as number,
      leavingFrom?.longitude as number,
      goingTo?.latitude as number,
      goingTo?.longitude as number
    );

    const hundredKm = 100;
    const price = (distance / hundredKm) * 4000 * numberOfPassenger;

    setDistance({
      from: leavingFrom?.name as string,
      to: goingTo?.name as string,
      distance,
      date: String(format(date.from, "LLL dd, y")),
      numberOfPassenger,
      price,
      ticketType: activeTrip,
    });
  };
  return (
    <Dialog open={onOpen} onOpenChange={state.setOpen}>
      <DialogContent className="max-w-6xl mx-auto  grid gap-y-10 p-5 mb-6">
        <DialogHeader>
          <DialogTitle className="text-center grid gap-y-5">
            <h1 className="text-center text-3xl">
              {session ? "Purchase Ticket" : "View Ticket"}
            </h1>
          </DialogTitle>
        </DialogHeader>
        {distance ? (
          <div>
            <div className="flex justify-between">
              <h2>Leaving from:</h2>
              <p>{distance.from}</p>
            </div>
            <div className="flex justify-between">
              <h2>Going to:</h2>
              <p>{distance.to}</p>
            </div>
            <div className="flex justify-between">
              <h2>Date:</h2>
              <p>{distance.date}</p>
            </div>
            <div className="flex justify-between">
              <h2>Number of passengers:</h2>
              <p>{distance.numberOfPassenger}</p>
            </div>

            <div className="flex justify-between">
              <h2>Ticket type:</h2>
              <p>{distance.ticketType}</p>
            </div>
            <div className="flex justify-between">
              <h2>Distance:</h2>
              <p>{distance.distance}</p>
            </div>
            <div className="flex justify-between">
              <h2>Price:</h2>
              <p>{distance.price}</p>
            </div>
            {session ? (
              <Button>Buy Ticket</Button>
            ) : (
              <Button asChild className="items-end">
                <Link href="/auth/login">Login to buy ticket</Link>
              </Button>
            )}
          </div>
        ) : (
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Leaving from */}
                <FormField
                  control={form.control}
                  name="leavingFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PopoverItem
                          title="Leaving from"
                          location={field.value}
                          setLocation={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Going to */}
                <FormField
                  control={form.control}
                  name="goingTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PopoverItem
                          title="Leaving from"
                          location={field.value}
                          setLocation={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <PopoverCalender
                        activeTrip={activeTrip}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormItem>
                  )}
                />
                {/* Number of passengers */}
                <FormField
                  control={form.control}
                  name="numberOfPassenger"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Number of passengers"
                          min={1}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit">submit</Button>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

// grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))]
export default ViewTicketModal;
