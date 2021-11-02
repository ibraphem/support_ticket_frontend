import React from "react";
import { useStateValue } from "../../StateProvider";
import AdminDashboard from "./AdminDashboard";
import AgentDashboard from "./AgentDashboard";
import CustomerDashboard from "./CustomerDashboard";

const Dashboard = () => {
  const [{ role }] = useStateValue();

  return (
    <>
      {role === "Customer" ? (
        <CustomerDashboard />
      ) : role === "Admin" ? (
        <AdminDashboard />
      ) : role === "Agent" ? (
        <AgentDashboard />
      ) : null}
    </>
  );
};

export default Dashboard;
