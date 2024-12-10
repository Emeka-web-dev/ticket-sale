"use client";
import { useUserQuery } from "@/hooks/use-user-query";
import RealChartUI from "../../../components/dashboard/real-chart";
import { useUserSocket } from "@/hooks/use-user-socket";
// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
const AdminPage = () => {
  const queryKey = "ticket-sales";
  const { data, status } = useUserQuery({
    apiUrl: "api/admin/get-all-tickets",
    queryKey,
  });

  useUserSocket({ queryKey, eventId: "update-ticket" });

  console.log({ data });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold my-4 ">Manage your sales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <ResponsiveContainer className="" width="100%" minHeight={500}>
            <BarChart width={150} height={40} data={data}>
              <CartesianGrid stroke="#faf7f7" className="bg-gray-300" />
              <XAxis dataKey="name" />
              <YAxis stroke="#757171" />
              <Tooltip
                cursor={{ fill: "#d1d5db" }}
                formatter={(value) => `$${value}k`}
              />
              <Bar
                dataKey="uv"
                fill="#9ca3af"
                type="monotone"
                stroke="#9ca3af"
              />
            </BarChart>
          </ResponsiveContainer> */}
        <div className="">
          <RealChartUI data={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
