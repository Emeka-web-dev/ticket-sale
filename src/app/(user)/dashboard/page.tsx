"use client";
import RealChartUI from "@/components/dashboard/real-chart";
import { useUserQuery } from "@/hooks/use-user-query";

const DashboardPage = () => {
  const { data, status } = useUserQuery({
    apiUrl: "/api/user-tickets",
    queryKey: "user",
  });
  console.log({ data, status });

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error...</div>;
  }
  console.log({ data });
  return <RealChartUI data={data} />;
};

export default DashboardPage;
