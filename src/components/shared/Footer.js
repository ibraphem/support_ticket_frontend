import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Cookie from "universal-cookie";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

const Footer = () => {
  const history = useHistory();
  const cookie = new Cookie();
  const [{ token }, dispatch] = useStateValue();

  const logout = () => {
    cookie.remove("access_token");
    dispatch({
      type: "SIGN_USER_OUT",
    });
    history.push("/");
  };

  const footerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    padding: "50px",
    height: "40px",
    background: "transparent",
  };
  return (
    <div style={footerStyle}>
      {token ? (
        <IconButton edge="start" color="primary" onClick={logout}>
          <ExitToAppIcon />
          <Typography color="primary" style={{ marginLeft: "10px" }}>
            Log Out
          </Typography>
        </IconButton>
      ) : null}
    </div>
  );
};

export default Footer;
