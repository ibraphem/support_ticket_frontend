import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const AttachFile = ({ fileToUploads, handleFileUpload, handleAddUpload }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*,application/pdf,.doc,.docx,.zip"
        className={classes.input}
        id="contained-button-file"
        onChange={handleFileUpload}
        type="file"
        readOnly
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          component="span"
          type="submit"
          style={{
            background: "transparent",
            padding: "7px",

            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          Select file
        </Button>

        <TextField
          variant="outlined"
          size="small"
          style={{ borderLeftWidth: 0, width: "70%" }}
          value={fileToUploads?.name || ""}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ float: "right" }}
          startIcon={<AddIcon />}
          onClick={handleAddUpload}
          disabled={fileToUploads?.name ? false : true}
        >
          {" "}
          Add more
        </Button>
      </label>
    </div>
  );
};

export default AttachFile;
