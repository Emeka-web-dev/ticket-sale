"use client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket } from "@prisma/client";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useModalStore } from "@/lib/use-modal-store";
import Link from "next/link";

interface TripData {
  id: string;
  ticketNumber: string;
  userId: string;
  distance: number;
  leavingFrom: string;
  goingTo: string;
  startDate: Date | null;
  endDate: Date | null;
  isRoundTrip: boolean;
  price: number;
  status: string;
  numberOfPassengers: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}
type RealChartProps = {
  data: Ticket[];
};

const RealChartUI = ({ data }: RealChartProps) => {
  const rows: TripData[] = data;
  const handleCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("id copied to clipboard");
  };

  const setOpen = useModalStore((state) => state.setOpen);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "leavingFrom", headerName: "Leaving From", width: 150 },
    { field: "goingTo", headerName: "Going To", width: 150 },
    {
      field: "startDate",
      headerName: "startDate",
      width: 150,
      renderCell: (item: GridRenderCellParams<TripData>) => (
        <span>
          {format(new Date(item?.row.startDate as Date), "yyyy-MM-dd")}
        </span>
      ),
    },
    {
      field: "endDate",
      headerName: "endDate",
      width: 150,
      renderCell: (item: GridRenderCellParams<TripData>) => (
        <span>
          {format(new Date(item?.row.endDate as Date), "yyyy-MM-dd")}{" "}
        </span>
      ),
    },

    { field: "price", headerName: "Price", width: 150 },
    { field: "numberOfPassengers", headerName: "Passengers", width: 150 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      renderCell: (item: GridRenderCellParams<TripData>) => {
        return (
          <span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {" "}
                  <Ellipsis size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleCopy(item.id as string)}
                  className="cursor-pointer"
                >
                  copy id{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`/dashboard/${item.id}`}
                    className="cursor-pointer"
                  >
                    view ticket
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ height: "100%", width: "95%" }} className="mx-auto">
      <div className="my-4 grid w-full place-content-end">
        <Button
          onClick={() => setOpen(true, "viewTicket")}
          className=" capitalize shadow  text-white w-[170px] !py-6 text-base   "
        >
          Buy ticket
        </Button>
      </div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default RealChartUI;
