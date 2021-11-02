import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const SubmitButton = ({ color, label, type, onClick, isLoading, width }) => {
  return (
    <Button
      variant="contained"
      type={type}
      color={color}
      disabled={isLoading ? true : false}
      style={{ margin: "15px 0" }}
      onClick={onClick}
      fullWidth={width}
    >
      {isLoading ? (
        <CircularProgress variant="indeterminate" size="20px" thickness={2} />
      ) : (
        label
      )}
    </Button>
  );
};

export default SubmitButton;
