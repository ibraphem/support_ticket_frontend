import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Cookie from "universal-cookie";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

const Footer = () => {

  const history = useHistory();
  const cookie = new Cookie();
  const [{ token, user }, dispatch] = useStateValue();

    const logout = () => {
    cookie.remove("access_token");
     dispatch({
              type: "SIGN_USER_OUT",
            });
    history.push("/");
  }

  const footerStyle = {
    position: "relative",
    margin: "0px 20px",
    padding: "50px",
    bottom: 0,
    width: "100%",
    height: "40px",
    background: "transparent",
  };
  return (
    <div style={footerStyle}>

        <IconButton edge="start" color="primary"  onClick={logout}>
          <ExitToAppIcon />
          <Typography color="primary"  style={{marginLeft:"10px"}}>Log Out</Typography>
        </IconButton>
    </div>
  );
};

export default Footer;
