import React from "react";
import { Grid } from "@material-ui/core";
import UserDashboardCard from "../shared/UserDashboardCard";

const CustomerDashboard = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <UserDashboardCard label="Open Support Ticket" link="/ticket/open" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserDashboardCard label="View Support Tickets" link="/view" />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomerDashboard;
