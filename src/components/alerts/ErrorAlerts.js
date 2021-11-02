import React from "react";
import Alert from "@material-ui/lab/Alert";

const ErrorAlerts = ({ message, close }) => {
  return (
    <Alert
      severity="error"
      onClose={() => {
        close();
      }}
    >
      {message}
    </Alert>
  );
};

export default ErrorAlerts;
