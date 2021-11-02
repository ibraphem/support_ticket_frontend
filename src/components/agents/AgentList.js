import React, { useState, useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { URL } from "../../components/Config";

const AgentList = ({ anchorEl, handleClose }) => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/agents`).then((response) => {
      //    console.log(response.data);
      setAgents(response.data);
    });
  }, []);

  const menuTitle = {
    fontSize: "18px",
    textAlign: "centre",
    fontWeight: "bolder",
    padding: "20px",
    color: "#00528B",
  };
  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <span style={menuTitle}>Assign To</span>
        {agents.map((agent) => (
          <div key={agent.id}>
            <Divider />
            <MenuItem onClick={handleClose} dense value={agent.id}>
              {agent.name}
            </MenuItem>
          </div>
        ))}
      </Menu>
    </>
  );
};

export default AgentList;
