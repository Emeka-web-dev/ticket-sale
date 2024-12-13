"use client";
import { useSingleTicketQuery } from "@/hooks/user-single-ticket";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

const SingleTicket = () => {
  const refElement = useRef(null);
  const { ticketId } = useParams();
  const { data, status } = useSingleTicketQuery({
    apiUrl: `/api/user-tickets/${ticketId}`,
    queryKey: "user-ticket",
  });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }

  const handleDownload = async () => {
    const ticketElement = document.getElementById("ticket");
    html2pdf(ticketElement);
  };
  return (
    <div>
      <div
        id="ticket"
        className="grid max-w-4xl mx-auto px-5 gap-y-5 mt-5 w-full"
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">
            Find below the details of your ticket
          </p>
          <Button onClick={handleDownload} data-html2canvas-ignore>
            download ticket
          </Button>
        </div>
        <div className="grid max-w-4xl mx-auto   gap-y-5 w-full ">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">name:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
            <p className="text-muted-foreground">{data?.user.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">email:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
            <p className="text-muted-foreground">{data?.user.email}</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">TicketId:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
            <p className="text-muted-foreground">{data?.ticketNumber}</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Price:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
            <p className="text-muted-foreground">{data?.price}</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Status:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
            <p className="text-muted-foreground">{data?.status}</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Leaving from:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
            <p className="text-muted-foreground">{data?.leavingFrom}</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Going to:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3" />
            <p className="text-muted-foreground">{data?.goingTo}</p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Date:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
            <p className="text-muted-foreground">
              {String(format(data.startDate, "LLL dd, y"))}
              {data.returnDate && -String(format(data.returnDate, "LLL dd, y"))}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Number of passengers:</h2>
            <div className="flex-grow border-dotted border-b border-gray-800 mx-3"></div>
            <p className="text-muted-foreground">{data?.numberOfPassengers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
