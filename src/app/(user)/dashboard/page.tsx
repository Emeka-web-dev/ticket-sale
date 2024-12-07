"use client";
import { columns, TicketProp } from "@/components/customer-dashboard/column";
import { DataTable } from "@/components/customer-dashboard/data-table";

const DashboardPage = () => {
  const dashboardPageData: TicketProp[] = [
    {
      TicketID: "T12345",
      price: 100,
      status: "open",
      date: "2022-01-01",
      customer: "John Doe",
      active: true,
    },
    {
      TicketID: "T12345",
      price: 100,
      status: "open",
      date: "2022-01-01",
      customer: "John Doe",
      active: true,
    },
    {
      TicketID: "T12345",
      price: 100,
      status: "open",
      date: "2022-01-01",
      customer: "John Doe",
      active: true,
    },
    {
      TicketID: "T12345",
      price: 100,
      status: "open",
      date: "2022-01-01",
      customer: "John Doe",
      active: true,
    },
  ];

  return (
    <div className=" w-full min-h-[calc(100vh-100px)] p-4">
      <DataTable columns={columns} data={dashboardPageData} />
    </div>
  );
};

export default DashboardPage;

// const dashboardPageData: itemType = [
//   {
//     id: 1,
//     title: "summary",
//     Icon: Settings,
//   },
//   {
//     id: 3,
//     title: "sales",
//     Icon: BadgeDollarSign,
//   },
//   {
//     id: 3,
//     title: "customers",
//     Icon: User,
//   },
// ];

// const listElements = [
//   {
//     id: 1,
//     title: "sales",
//     count: 120,
//     Icon: BadgeDollarSign,
//   },
//   {
//     id: 2,
//     count: 140,
//     title: "customers",
//     Icon: User,
//   },
//   {
//     id: 3,
//     title: "Revenue",
//     count: 12000,
//     Icon: Settings,
//   },
// ];
