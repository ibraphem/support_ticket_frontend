import React, {useState} from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import {URL} from "./components/Config";
import axios from "axios";
import Login from "./components/auth/Login";
import Header from "./components/shared/Header";
import Title from "./components/shared/Title";
import Footer from "./components/shared/Footer";
import TicketInfo from "./components/ticket/TicketInfo";
import TicketCard from "./components/shared/TicketCard";
import CookieService from "./components/auth/CookieService";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Cookie from "universal-cookie";
import { useStateValue } from "./StateProvider";

 

const App = () => {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [iserror, setIserror] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

const [{ token, user }, dispatch] = useStateValue();

    const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMe = () => {
    setIsRemember(!isRemember);
  };

  const history = useHistory();

 const expiresAt = 60 * 24;
const cookie = new Cookie();

  const login = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${URL}/login`, credentials);
      if (response) {
        if (!isRemember) {
          const options = { path: "/" };
          console.log(response.data.user)
         CookieService.set("access_token", response.data.token,options);
          CookieService.set("role",response.data.user.role,options);
          CookieService.set("name",response.data.user.name,options);
          CookieService.set("user_id",response.data.user.user_id,options);
          dispatch({
              type: "SIGN_USER_IN",
                 item: {
                access_token: response.data.token,
                name: response.data.user.name,
                role: response.data.user.role,
                user_id: response.data.user.user_id
              },
            });
          history.push("/dashboard");
        } else {
          let date = new Date();
          date.setTime(date.getTime() + expiresAt * 60 * 1000);

          const options = { path: "/", expires: date };
          CookieService.set("access_token", response.data.token,options);
          CookieService.set("role",response.data.user.role,options);
          CookieService.set("name",response.data.user.name,options);
          CookieService.set("user_id",response.data.user.user_id,options);
            dispatch({
              type: "SIGN_USER_IN",
                 item: {
                access_token: response.data.token,
                name: response.data.user.name,
                role: response.data.user.role,
                user_id: response.data.user.user_id
              },
            });
          history.push("/dashboard");
        }
      }
    } catch (error) {
      setIserror(true);
      setAlertMessage("Access Denied!!! Incorrect Login Credential");
      return false;
    }
  };



  return (
    <>
      <Header />
      <Title />
      <Switch>
      <Route
        exact
        path="/"
        render={(props) => (
          <Login
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            login={login}
            email={email}
            password={password}
            iserror={iserror}
            alertMessage={alertMessage}
            handleRememberMe={handleRememberMe}
            isRemember={isRemember}
          />
        )}
      />
      <>
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/ticket/open" component={TicketInfo} />
     <Footer/>
      </>
      </Switch>
    </> 
  );
};

export default App;
