import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./Reducer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00528B",
      light: "#00C437",
    },
    
  },
});
const history = createBrowserHistory();

ReactDOM.render(
    <StateProvider initialState={initialState} reducer={reducer}>
  <Router history={history}>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </Router>
   </StateProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
