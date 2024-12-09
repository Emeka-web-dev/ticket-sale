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

interface TripData {
  id: number;
  leavingFrom: string;
  goingTo: string;
  startDate: string;
  endDate: string;
  price: number;
  numberOfPassengers: number;
}
const RealChartUI = () => {
  const rows: TripData[] = [
    {
      id: 1,
      leavingFrom: "Lagos",
      goingTo: "Abuja",
      startDate: "2022-01-01T10:00:00Z",
      endDate: "2022-01-02T10:00:00Z",
      price: 25,
      numberOfPassengers: 2,
    },
    {
      id: 2,
      leavingFrom: "Lagos",
      goingTo: "Abuja",
      startDate: "2022-01-01T10:00:00Z",
      endDate: "2022-01-02T10:00:00Z",
      price: 25,
      numberOfPassengers: 2,
    },
    {
      id: 3,
      leavingFrom: "Lagos",
      goingTo: "Abuja",
      startDate: "2022-01-01T10:00:00Z",
      endDate: "2022-01-02T10:00:00Z",
      price: 25,
      numberOfPassengers: 2,
    },
    {
      id: 6,
      leavingFrom: "Lagos",
      goingTo: "Abuja",
      startDate: "2022-01-01T10:00:00Z",
      endDate: "2022-01-02T10:00:00Z",
      price: 25,
      numberOfPassengers: 2,
    },
    {
      id: 4,
      leavingFrom: "Lagos",
      goingTo: "Abuja",
      startDate: "2022-01-01T10:00:00Z",
      endDate: "2022-01-02T10:00:00Z",
      price: 25,
      numberOfPassengers: 2,
    },
    {
      id: 5,
      leavingFrom: "Lagos",
      goingTo: "Abuja",
      startDate: "2022-01-01T10:00:00Z",
      endDate: "2022-01-02T10:00:00Z",
      price: 25,
      numberOfPassengers: 2,
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "leavingFrom", headerName: "Leaving From", width: 150 },
    { field: "goingTo", headerName: "Going To", width: 150 },
    {
      field: "startDate",
      headerName: "startDate",
      width: 150,
      renderCell: (item: GridRenderCellParams<TripData>) => (
        <span>{item?.row.startDate.slice(0, 10)}</span>
      ),
    },
    {
      field: "endDate",
      headerName: "endDate",
      width: 150,
      renderCell: (item: GridRenderCellParams<TripData>) => (
        <span>{item?.row.endDate.slice(0, 10)}</span>
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
                <DropdownMenuItem>{item.id} </DropdownMenuItem>
                <DropdownMenuItem>downloads</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        );
      },
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }} className="">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default RealChartUI;
