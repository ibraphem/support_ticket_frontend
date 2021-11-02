import React from "react";
import Alert from "@material-ui/lab/Alert";

const SuccessAlerts = ({ message, close }) => {
  return (
    <Alert
      onClose={() => {
        close();
      }}
    >
      {message}
    </Alert>
  );
};

export default SuccessAlerts;
