import React from "react";
import { Paper, Grid } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import moment from "moment";

const TicketCard2 = ({ ticket }) => {
  const paperStyle = {
    margin: "0px 80px 20px 80px",
    borderRadius: "10px",
  };
  const spanStyle = {
    fontSize: "13px",
    color: "#013255",
  };
  return (
    <Paper elevation={10} style={paperStyle}>
      <Grid container style={{ padding: "15px 50px" }}>
        <Grid item xs={10} sm={10}>
          <span style={{ color: "#00528b", fontWeight: "bold" }}>
            {`#UAM-${ticket.file_id} - ${ticket.service}`}
          </span>
        </Grid>
        <Grid item xs={2} sm={2} style={{ textAlign: "right" }}>
          <FiberManualRecordIcon
            fontSize="small"
            style={{
              color:
                ticket.status === "Open"
                  ? "#00C337"
                  : ticket.status === "Replied"
                  ? "#00528B"
                  : "#A1A1A1",
            }}
          />{" "}
          <span style={{ fontSize: "15px", color: "#00528b" }}>
            {ticket.status}
          </span>
        </Grid>

        <Grid item xs={10} sm={10}>
          <span style={spanStyle}>
            Last Updated: {moment(ticket.date).startOf("hour").fromNow()}
          </span>
        </Grid>
        <Grid item xs={2} sm={2} style={{ textAlign: "right" }}>
          <span style={spanStyle}>
            Submitted: {moment(ticket.date).format("DD-MM-YYYY")}
          </span>
        </Grid>
        <Grid item xs={10} sm={10}>
          <span style={spanStyle}>Department: {ticket.department}</span>
        </Grid>
        <Grid item xs={2} sm={2} style={{ textAlign: "right" }}>
          <span style={spanStyle}>Priority: {ticket.priority}</span>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TicketCard2;
