"use client";
import RealChart from "@/components/dashboard/real-chart";
import { BadgeDollarSign, Settings, User, UsersRound } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SalesDataTable } from "@/components/sales-table";
import { CustomerDataTable } from "@/components/customer-table";

type itemType = {
  id: number;
  title: string;
  Icon: React.ElementType;
}[];
const DashboardPage = () => {
  const [active, setActive] = React.useState("summary");

  const dashboardPageData: itemType = [
    {
      id: 1,
      title: "summary",
      Icon: Settings,
    },
    {
      id: 3,
      title: "sales",
      Icon: BadgeDollarSign,
    },
    {
      id: 3,
      title: "customers",
      Icon: User,
    },
  ];

  const listElements = [
    {
      id: 1,
      title: "sales",
      count: 120,
      Icon: BadgeDollarSign,
    },
    {
      id: 2,
      count: 140,
      title: "customers",
      Icon: User,
    },
    {
      id: 3,
      title: "Revenue",
      count: 12000,
      Icon: Settings,
    },
  ];
  return (
    <div className=" w-full min-h-[calc(100vh-100px)]  p-4">
      <div className="grid  md:grid-cols-[250px_1fr]   rounded-xl bg-gray-50 overflow-hidden">
        {/* first sidebar */}
        <div className="border-r-[1px] flex relative  border-gray-300 md:min-h-[calc(100vh-100px)]  flex-col items-center justify-center rounded-l-lg overflow-hidden ">
          <div
            className={`absolute top-0 left-0 w-full h-1/2 bg-[url("/spiral.png")] opacity-10 -z-0 bg-cover bg-center bg-no-repeat`}
          ></div>
          <div className="flex flex-col gap-5 pt-4 md:pt-0 md:gap-9 relative">
            {dashboardPageData.map((item) => (
              <div
                onClick={() => setActive(item.title)}
                key={item.id}
                className="flex items-center  gap-4 cursor-pointer min-w-[200px] "
              >
                {item.Icon && (
                  <item.Icon
                    className={`${
                      active === item.title ? " " : ""
                    } stroke-blue-950  `}
                  />
                )}
                <span
                  className={`${
                    active === item.title
                      ? "text-blue-950 font-semibold"
                      : "font-medium"
                  } capitalize text-blue-950  text-lg   `}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* dashboard layout */}
        <div className=" h-full w-full rounded-r-lg p-3">
          <div className="flex  my-3">
            <h1 className="text-center text-3xl font-bold capitalize text-blue-950 ">
              business Dashboard
            </h1>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 my-7">
            {listElements.map((item) => (
              <div
                key={item.id}
                className="bg-blue-950 p-4 min-h-[60px] rounded-xl flex justify-between col-span-full md:col-span-1"
              >
                <div>
                  <h1 className="text-white font-bold text-lg uppercase">
                    {item.title}
                  </h1>
                  <p className="text-white font-bold text-lg">{item.count} </p>
                </div>
                <item.Icon className="text-white font-bold text-3xl " />
              </div>
            ))}
          </div>
          <div className="">
            {active === "sales" && <SalesDataTable />}
            {active === "customers" && <CustomerDataTable />}
            {active === "summary" && (
              <Card>
                <CardHeader>
                  <CardTitle>Total sale</CardTitle>
                </CardHeader>
                <CardContent>
                  <RealChart />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
