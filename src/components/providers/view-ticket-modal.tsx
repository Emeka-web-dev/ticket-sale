import { Label } from "@/components/ui/label";
import { useModalStore } from "@/lib/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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

const ViewTicketModal = () => {
  const state = useModalStore();
  const onOpen = state.isOpen && state.type === "viewTicket";

  const [activeTrip, setActiveTrip] = React.useState<"round-trip" | "one-way">(
    "round-trip"
  );

  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      leavingFrom: null,
      goingTo: null,
      // date: {
      //   departureDate: undefined,
      //   returnDate: undefined,
      // },
      // numberOfPassenger: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof TicketSchema>) => {
    console.log("submitting", values);
  };
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormField
                control={form.control}
                name="goingTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PopoverItem
                        title="going to"
                        location={field.value}
                        setLocation={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">submit</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// grid-cols-[repeat(auto-fit,_minmax(270px,_1fr))]
export default ViewTicketModal;
