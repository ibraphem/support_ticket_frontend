import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { URL } from "./components/Config";
import axios from "axios";
import Login from "./components/auth/Login";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import TicketInfo from "./components/ticket/TicketInfo";
import CookieService from "./components/auth/CookieService";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import { useStateValue } from "./StateProvider";
import ViewTicket from "./components/ticket/ViewTicket";
import TicketDetail from "./components/ticket/TicketDetail";
import NotAuthorized from "./components/shared/NotAuthorized";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState(false);
  const [iserror, setIserror] = useState();
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [{ role }, dispatch] = useStateValue();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberMe = () => {
    setIsRemember(!isRemember);
  };

  const history = useHistory();

  const close = () => {
    setIserror(null);
    setAlertMessage("");
  };

  const loginFunc = (response) => {
    const expiresAt = isRemember ? 1440 : 120;
    let date = new Date();
    date.setTime(date.getTime() + expiresAt * 60 * 1000);

    const options = { path: "/", expires: date };
    CookieService.set("access_token", response.data.token, options);
    CookieService.set("role", response.data.user.role, options);
    CookieService.set("name", response.data.user.name, options);
    CookieService.set("user_id", response.data.user.id, options);
    dispatch({
      type: "SIGN_USER_IN",
      item: {
        access_token: response.data.token,
        name: response.data.user.name,
        role: response.data.user.role,
        user_id: response.data.user.id,
      },
    });
    history.push("/dashboard");
  };

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const credentials = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${URL}/register`, credentials);
      if (response.data.token) {
        response.data.user.role = response.data.role;
        //   console.log(response.data);
        loginFunc(response);
        setIsLoading(false);
      } else {
        //  console.log(response);
        setIserror(true);
        setAlertMessage("Something went wrong");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setIsLoading(true);
      setIserror(true);
      setAlertMessage("Something went wrong");
      setIsLoading(false);
      return false;
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const credentials = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(`${URL}/login`, credentials);
      if (response.data.token) {
        //     console.log(response.data);
        loginFunc(response);
        setIsLoading(false);
      } else {
        setIserror(true);
        setAlertMessage("Incorrect Credentials!!!");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setIsLoading(true);
      setIserror(true);
      setAlertMessage("Incorrect Credentials!!!");
      setIsLoading(false);
      return false;
    }
  };

  return (
    /* <AddTicket/>*/
    <>
      <Header />

      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route
          exact
          path="/register"
          render={(props) => (
            <Login
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              register={register}
              email={email}
              password={password}
              iserror={iserror}
              alertMessage={alertMessage}
              isLoading={isLoading}
              name={name}
              handleNameChange={handleNameChange}
              close={close}
              auth="register"
            />
          )}
        />

        <Route
          exact
          path="/login"
          render={(props) => (
            <Login
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              login={login}
              email={email}
              password={password}
              iserror={iserror}
              handleRememberMe={handleRememberMe}
              isRemember={isRemember}
              isLoading={isLoading}
              alertMessage={alertMessage}
              close={close}
              auth="login"
              role={role}
            />
          )}
        />
        <>
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/ticket/open" component={TicketInfo} />
          <ProtectedRoute exact path="/view" component={ViewTicket} />
          <ProtectedRoute
            exact
            path="/unauthorized"
            component={NotAuthorized}
          />
          <ProtectedRoute
            exact
            path="/ticket/detail/:ticket_id/:file_id"
            component={TicketDetail}
          />
          <Footer />
        </>
      </Switch>
    </>
  );
};

export default App;
