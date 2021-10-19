import React from "react";
import { Paper, Typography, Box, Toolbar, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const TicketCard = () => {
  const paperStyle = {
    margin: "10px 80px 0px 80px",
    borderRadius: "10px",
  };
  const ticketStyle = {
    display: "flex",
    flexGrow: 1,
  };
  return (
    <>
      <Paper elevation={10} style={paperStyle}>
        <Grid container style={{ padding: "10px 50px" }}>
          <Grid item xs={6} sm={6}>
            <span style={{ color: "#00528b", fontWeight: "bold" }}>
              #UAM-216-40679 - Cloud Restoration
            </span>
          </Grid>
          <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
            <FiberManualRecordIcon
              fontSize="small"
              style={{ color: "#00C437" }}
            />{" "}
            <span style={{ fontSize: "15px", color: "#00528b" }}>Open</span>
          </Grid>

          <Grid item xs={4} sm={4}>
            <span style={{ fontSize: "13px", color: "#013255" }}>
              Submitted: 20/10/2021
            </span>
          </Grid>
          <Grid item xs={4} sm={4} style={{ textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "#013255" }}>
              Department: Hub
            </span>
          </Grid>
          <Grid item xs={4} sm={4} style={{ textAlign: "right" }}>
            <span style={{ fontSize: "13px", color: "#013255" }}>
              Priority: High
            </span>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={10} style={paperStyle}>
        <Grid container style={{ padding: "10px 50px" }}>
          <Grid item xs={6} sm={6}>
            <span style={{ color: "#00528b", fontWeight: "bold" }}>
              #UAM-216-40679 - Cloud Restoration
            </span>
          </Grid>
          <Grid item xs={6} sm={6} style={{ textAlign: "right" }}>
            <FiberManualRecordIcon
              fontSize="small"
              style={{ color: "#00C437" }}
            />{" "}
            <span style={{ fontSize: "15px", color: "#00528b" }}>Open</span>
          </Grid>

          <Grid item xs={4} sm={4}>
            <span style={{ fontSize: "13px", color: "#013255" }}>
              Submitted: 20/10/2021
            </span>
          </Grid>
          <Grid item xs={4} sm={4} style={{ textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "#013255" }}>
              Department: Hub
            </span>
          </Grid>
          <Grid item xs={4} sm={4} style={{ textAlign: "right" }}>
            <span style={{ fontSize: "13px", color: "#013255" }}>
              Priority: High
            </span>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default TicketCard;
