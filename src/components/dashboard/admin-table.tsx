"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Ellipsis } from "lucide-react";
import toast from "react-hot-toast";

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
  user: {
    email: string;
  };
}
type RealChartProps = {
  data: TripData[];
};

const AdminTableUI = ({ data }: RealChartProps) => {
  const rows: TripData[] = data;
  const handleCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("id copied to clipboard");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "leavingFrom", headerName: "Leaving From", width: 150 },
    { field: "goingTo", headerName: "Going To", width: 150 },
    {
      field: "email",
      headerName: "user email",
      width: 250,
      renderCell: (item: GridRenderCellParams<TripData>) => (
        <span>{item.row.user.email}</span>
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
                <DropdownMenuItem onClick={() => handleCopy(item.id as string)}>
                  copy id{" "}
                </DropdownMenuItem>
                {/* <DropdownMenuItem>downloads</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ height: "100%", width: "95%" }} className="mx-auto">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default AdminTableUI;
