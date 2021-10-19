import React from 'react';
import { useStateValue } from "../../StateProvider";
import CustomerDashboard from "./CustomerDashboard"

const Dashboard = () => {

  const [{ role}] = useStateValue();
  console.log(role)
    return (
        <>
            {role  ===  'Customer' ? <CustomerDashboard/> : null}
        </>
    );
};

export default Dashboard;