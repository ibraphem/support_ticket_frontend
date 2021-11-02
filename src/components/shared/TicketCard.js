import React, { useState } from "react";
import { Paper, Grid } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import moment from "moment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useStateValue } from "../../StateProvider";
import AgentList from "../agents/AgentList";
import axios from "axios";
import { URL } from "../../components/Config";
import { Link } from "react-router-dom";

const TicketCard = ({
  file_id,
  agentId,
  service,
  priority,
  date,
  department,
  status,
  ticket_id,
  agentName,
  rerender,
}) => {
  const paperStyle = {
    margin: "10px 80px 0px 80px",
    borderRadius: "10px",
  };
  const [{ role }] = useStateValue();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (event) => {
    let agent_id = event.currentTarget.value;

    //    console.log("agent id", agent_id);
    await axios
      .get(`${URL}/assign/ticket/${agent_id}/${ticket_id}`)
      .then((response) => {
        if (response) {
          console.log(response.data);
          setAnchorEl(null);
          rerender(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setAnchorEl(null);
      });
  };

  return (
    <>
      <Paper elevation={10} style={paperStyle}>
        <Grid container style={{ padding: "10px 50px" }}>
          <Grid item xs={9} sm={9}>
            {role === "Admin" ? (
              <span
                style={{ fontWeight: "bold", color: "#00528b" }}
              >{`#UAM-${file_id} - ${service}`}</span>
            ) : (
              <span style={{ fontWeight: "bold" }}>
                <Link
                  to={`ticket/detail/${ticket_id}/${file_id}`}
                  style={{ textDecoration: "none", color: "#00528b" }}
                >
                  {" "}
                  {`#UAM-${file_id} - ${service}`}
                </Link>
              </span>
            )}
          </Grid>
          <Grid
            item
            xs={role === "Admin" ? 2 : 3}
            sm={role === "Admin" ? 2 : 3}
            style={{ textAlign: role === "Admin" ? "left" : "right" }}
          >
            <FiberManualRecordIcon
              fontSize="small"
              style={{
                color:
                  status === "Open"
                    ? "#00C337"
                    : status === "Replied"
                    ? "#00528B"
                    : "#A1A1A1",
              }}
            />{" "}
            <span style={{ fontSize: "15px", color: "#00528b" }}>{status}</span>
          </Grid>
          {role === "Admin" ? (
            <Grid item xs={1} sm={1} style={{ float: "right" }}>
              {agentId === null ? (
                <>
                  <MoreHorizIcon
                    style={{ textAlign: "right", cursor: "pointer" }}
                    value={ticket_id}
                    onClick={handleClick}
                  />
                  <AgentList anchorEl={anchorEl} handleClose={handleClose} />
                </>
              ) : (
                agentName
              )}
            </Grid>
          ) : null}

          <Grid item xs={4} sm={4}>
            <span style={{ fontSize: "13px", color: "#013255" }}>
              {role === "Admin" ? (
                <>Submitted: {moment(date).format("DD-MM-YYYY")}</>
              ) : (
                <>Last Updated: {moment(date).startOf("hour").fromNow()}</>
              )}
            </span>
          </Grid>
          <Grid item xs={5} sm={5} style={{ textAlign: "center" }}>
            <span style={{ fontSize: "13px", color: "#013255" }}>
              Department: {department}
            </span>
          </Grid>
          <Grid
            item
            xs={role === "Admin" ? 2 : 3}
            sm={role === "Admin" ? 2 : 3}
            style={{ textAlign: role === "Admin" ? "left" : "right" }}
          >
            <span style={{ fontSize: "13px", color: "#013255" }}>
              Priority: {priority}
            </span>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default TicketCard;
