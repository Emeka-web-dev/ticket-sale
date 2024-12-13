import { Ticket, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

interface UserQuery {
  queryKey: string;
  apiUrl: string;
}

export type UserData = {
  data: {
    ticket?: Ticket;
  };
  status: "pending" | "error" | "success";
};

export const useSingleTicketQuery = ({ apiUrl, queryKey }: UserQuery) => {
  const fetchUser = async () => {
    const res = await fetch(apiUrl);
    return res.json();
  };

  const { data, status } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchUser,
    refetchInterval: false,
  });

  return {
    data,
    status,
  };
};
