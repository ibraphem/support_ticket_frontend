import React from 'react';
import {Paper, Typography,  Box, Toolbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ContactsIcon from '@material-ui/icons/Contacts';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Link } from "react-router-dom";

const UserDashboardCard = ({label, link}) => {
  const paperStyle = {
    padding: "0px 15px",
    margin: "10px 80px 0px 80px",
    borderRadius: "10px",
    
  };
  const ticketStyle ={
    display: "flex",
      flexGrow: 1,
     }
    return (
              <Paper elevation={10} style={paperStyle}>
                   <Toolbar>
                        <IconButton color="primary" edge="start" >
                        <ContactsIcon />
                        </IconButton>
                        </Toolbar>
                        <Toolbar>
                          <Box style={ticketStyle}> <Typography color="primary">{label}</Typography></Box>
                            <Link to={link}>
                            <IconButton color="primary"    >
                            <ArrowRightAltIcon fontSize="large" />
                            </IconButton>
                            </Link>
                       </Toolbar>
                    </Paper>
               
    );
};

export default UserDashboardCard;