import React, {useState} from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const Login = ({
  email,
  password,
  handleEmailChange,
  handlePasswordChange,
  handleRememberMe,
  login,
  alertMessage,
  iserror,
  handleChecked,
  isRemember,
}) => {

const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  };


  const paperStyle = {
    padding: 20,
    height: "380px",
    width: "420px",
    margin: "0px auto",
    borderRadius: "10px",
  };
  const inputStyle = {
    padding: "10px 0px",
  };
    const checkStyle ={
    display: "flex",
      flexGrow: 1,
      marginaleft: 0
     }
  const btnstyle = { margin: "15px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={login}>
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
          InputLabelProps={{ shrink: true }}
          InputProps={{
               endAdornment:
                 <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>,
               }}
          />

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
                              <Link href="#">Forgot password ?</Link>
                          </Typography>
                       </Toolbar>
  
    
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>{" "}
        </form>
        <Typography align="center">
          Don't have an account?<Link href="#"> Sign Up Instead</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
