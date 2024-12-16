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
        <div className="">
          <AdminTableUI data={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
