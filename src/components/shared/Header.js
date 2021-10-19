import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {useStateValue} from "../../StateProvider"

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  desc: {
    fontSize: 15,
    paddingRight: 5,
  },
}));

const Header = () => {

    const [{ token, user, role }] = useStateValue();

  const classes = useStyles();
  const headerStyle = {
    padding: 5,
    backgroundColor: "#fff",
    marginBottom: "20px"
  };

console.log(role)
  return (
    <AppBar position="static" style={headerStyle}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}></Typography>
       {token ? (
          <IconButton color="primary">
              <span className={classes.desc}>{user}</span>
              <AccountCircle />
            </IconButton>
       ) : null}
       
           
      
 
      </Toolbar>
    </AppBar>
  );
};

export default Header;
