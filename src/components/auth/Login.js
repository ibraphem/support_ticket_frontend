import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import SuccessAlerts from "../alerts/SuccessAlerts";
import ErrorAlerts from "../alerts/ErrorAlerts";
import SubmitButton from "../shared/SubmitButton";
import { Link } from "react-router-dom";

const Login = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleRememberMe,
  login,
  register,
  isRemember,
  iserror,
  isLoading,
  alertMessage,
  name,
  handleNameChange,
  close,
  auth,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [{ token, user_id }] = useStateValue();

  const history = useHistory();

  useEffect(() => {
    if (token && user_id) {
      history.push("/dashboard");
    }
  }, [token, user_id, history]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const paperStyle = {
    padding: 15,
    margin: "20px 10px",
    borderRadius: "10px",
  };
  const inputStyle = {
    padding: "10px 0px",
  };
  const checkStyle = {
    display: "flex",
    flexGrow: 1,
    marginaleft: 0,
  };

  const linkStyle = { textDecoration: "none", color: "#00528b" };

  return (
    <Grid
      container
      align="center"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item xs={12} sm={12}>
        {iserror ? <ErrorAlerts message={alertMessage} close={close} /> : null}
        {iserror === false ? (
          <SuccessAlerts message={alertMessage} close={close} />
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12}>
        <Paper elevation={10} style={paperStyle}>
          <h2>{auth === "register" ? "Sign Up" : "Sign In"}</h2>
          <form onSubmit={auth === "login" ? login : register}>
            {auth === "register" ? (
              <TextField
                type="text"
                onChange={handleNameChange}
                value={name}
                label="Enter your name"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                style={inputStyle}
              />
            ) : null}
            <TextField
              type="email"
              onChange={handleEmailChange}
              value={email}
              label="Enter Email Address"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              style={inputStyle}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              label="Enter Password"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              style={inputStyle}
              value={password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />

            {auth === "login" ? (
              <Toolbar disableGutters={true}>
                <Box style={checkStyle}>
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label="Remember me"
                    checked={isRemember}
                    onChange={handleRememberMe}
                  />
                </Box>
                <Typography style={{ float: "right" }}>
                  <Link to="#" style={linkStyle}>
                    Forgot password ?
                  </Link>
                </Typography>
              </Toolbar>
            ) : null}

            <SubmitButton
              color="primary"
              label={auth === "login" ? "Sign In" : "Sign Up"}
              type="submit"
              isLoading={isLoading}
              width={true}
            />
          </form>
          {auth === "login" ? (
            <Typography align="center">
              Don't have an account?
              <Link to="/register" style={linkStyle}>
                {" "}
                Sign Up Instead
              </Link>
            </Typography>
          ) : (
            <Typography align="center">
              Have an account already ?
              <Link to="/login" style={linkStyle}>
                {" "}
                Sign In Instead
              </Link>
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12} sm={12}></Grid>
    </Grid>
  );
};

export default Login;
