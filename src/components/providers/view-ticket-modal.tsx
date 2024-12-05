import { Label } from "@/components/ui/label";
import { useModalStore } from "@/lib/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useSessionStore } from "@/hooks/user-session-store";
import { calculateDistance } from "@/utils/get-distance";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TicketSchema } from "../../../schemas";
import { PopoverCalender } from "../popover-calender";
import { PopoverItem } from "../popover-item";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";

type DistanceData = {
  from: string;
  to: string;
  distance: number;
  startDate: Date;
  returnDate?: Date;
  numberOfPassenger: number;
  price: number;
  ticketType: "round-trip" | "one-way";
};

const ViewTicketModal = () => {
  const state = useModalStore();
  const session = useSessionStore((state) => state.session);
  const onOpen = state.isOpen && state.type === "viewTicket";

  const [distance, setDistance] = useState<DistanceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      startDate: date.from,
      returnDate: date.to,
      numberOfPassenger,
      price,
      ticketType: activeTrip,
    });
  };

  const handleBuyTicket = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "/api/checkout",
        JSON.stringify(distance?.price)
      );
      console.log(data.data.authorization_url);
      window.location.assign(data.data.authorization_url);
    } catch (error) {
      console.log("sometihng went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={onOpen} onOpenChange={state.setOpen}>
      <DialogContent className="max-w-6xl mx-auto grid gap-y-10 p-5 mb-6">
        <DialogHeader>
          <DialogTitle className="text-center grid gap-y-5">
            <h1 className="text-center text-3xl">
              {session ? "Purchase Ticket" : "View Ticket"}
            </h1>
          </DialogTitle>
        </DialogHeader>
        {distance ? (
          <div className="">
            <div className="grid max-w-4xl mx-auto  gap-y-5 w-full ">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Leaving from:</h2>
                <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
                <p className="text-muted-foreground">{distance.from}</p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Going to:</h2>
                <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
                <p className="text-muted-foreground">{distance.to}</p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Date:</h2>
                <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
                <p className="text-muted-foreground">
                  {String(format(distance.startDate, "LLL dd, y"))}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Number of passengers:</h2>
                <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
                <p className="text-muted-foreground">
                  {distance.numberOfPassenger}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Ticket type:</h2>
                <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
                <p className="text-muted-foreground">{distance.ticketType}</p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Distance:</h2>
                <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
                <p className="text-muted-foreground">{distance.distance}</p>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Price:</h2>
                <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
                <p className="text-muted-foreground">{distance.price}</p>
              </div>
              <div className="grid md:justify-end w-full   ">
                {session ? (
                  <Button
                    onClick={handleBuyTicket}
                    disabled={isLoading}
                    className="cursor-pointer capitalize font-medium md:w-[252px] h-[70px]"
                  >
                    Buy Ticket
                  </Button>
                ) : (
                  <Button
                    asChild
                    onClick={() => state.setOpen(false)}
                    className=" cursor-pointer capitalize font-medium md:w-[252px] h-[70px] "
                  >
                    <Link href="/auth/login">Login to buy ticket</Link>
                  </Button>
                )}
              </div>
            </div>
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
              <form
                className="grid  gap-y-5 "
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-x-5 gap-y-5">
                  {/* Leaving from */}
                  <FormField
                    control={form.control}
                    name="leavingFrom"
                    render={({ field }) => (
                      <FormItem className="min-h-[70px]">
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
                      <FormItem className="min-h-[70px">
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
                      <FormItem className="!min-h-[70px]">
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
                      <FormItem className=" ">
                        <FormControl>
                          <Input
                            className="min-h-[70px] "
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
                </div>
                <div className="min-h-[70px] grid lg:justify-end ">
                  <Button
                    className="h-full lg:w-[252px] text-xl capitalize font-medium"
                    type="submit"
                  >
                    submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewTicketModal;
