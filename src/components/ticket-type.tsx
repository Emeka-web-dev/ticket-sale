import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const TicketType = () => {
  return (
    <div className="">
      <div className="border-b-2 border-gray-200 pb-5">
        <h1 className="text-2xl">Select Ticket Type</h1>
        <p className="">Choose your ticket for entry pass</p>
      </div>
      <div className="grid gap-y-10 pt-4">
        <div className="flex justify-between items-center ">
          <h1 className="">Select Day Access</h1>
          <p className="">₦10,000</p>
        </div>
        <p className="">
          Attend DevFest Lagos 2024 for 2 days with access to all talks and
          sessions
        </p>
        <div className="grid  md:grid-flow-col  gap-10 auto-cols-min ">
          <div className=" w-fit">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[60px] border grid place-items-center rounded-sm ">
            1
          </div>
          <Button>Buy Ticket</Button>
        </div>
      </div>
    </div>
  );
};

export default TicketType;
