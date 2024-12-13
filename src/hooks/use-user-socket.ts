import { pusherClient } from "@/lib/pusher";
import { Ticket } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface TicketWithEmail extends Ticket {
  user: {
    email: string;
  };
}

export const useUserSocket = ({
  queryKey,
  eventId,
}: {
  queryKey: string;
  eventId: string;
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    pusherClient.subscribe(queryKey);

    pusherClient.bind(eventId, (newTicket: TicketWithEmail) => {
      queryClient.setQueryData([queryKey], (oldData: TicketWithEmail[]) => {
        console.log("newTicket", newTicket);
        console.log("oldData", oldData);
        return [...oldData, newTicket];
      });
    });

    return () => {
      pusherClient.unsubscribe(queryKey);
    };
  }, [queryKey, eventId, queryClient]);
};
