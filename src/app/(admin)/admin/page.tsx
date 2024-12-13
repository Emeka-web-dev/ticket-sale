"use client";
import { useUserQuery } from "@/hooks/use-user-query";
import { useUserSocket } from "@/hooks/use-user-socket";
import AdminTableUI from "@/components/dashboard/admin-table";

const AdminPage = () => {
  const queryKey = "ticket-sales";
  const { data, status } = useUserQuery({
    apiUrl: "api/admin/get-all-tickets",
    queryKey,
  });
  useUserSocket({ queryKey, eventId: "update-ticket" });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold my-4 ">Manage your sales</h1>
      <div className="grid grid-cols-1 gap-4">
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
          <AdminTableUI data={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
