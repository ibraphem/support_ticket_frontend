import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from '@material-ui/icons/Cancel';

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

  const AttachFile = ({allUploadedFiles, fileToUploads, handleFileUpload, handleAddUpload, handleRemoveUpload}) => {
  const classes = useStyles();

  return (
    <>
    {allUploadedFiles?.length > 0 ? (
        <>
        {allUploadedFiles.map((allUploadedFile, index)=>(
          <div key={index} style={{marginBottom:"10px"}}>
               <TextField
          variant="outlined"
          size="small"
          InputProps={{readOnly:true}}
          style={{  width: "70%", marginLeft:"115px"}}
          value={allUploadedFile.name}
        />
        <Button
          variant="contained"
          color="secondary"
          style={{float: "right" }}
          startIcon={<CancelIcon />}
          onClick={handleRemoveUpload}
         
        >
          {" "}
          Remove
        </Button>
          </div>
        ))}

        </>
    ):null}
    <>
    <div className={classes.root}>
      <input
        className={classes.input}
        id="contained-button-file"
        onChange={handleFileUpload}
        type="file"
        name="file_upload"        
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          component="span"
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
          value={fileToUploads?.name}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{float: "right" }}
          startIcon={<AddIcon />}
          onClick={handleAddUpload}
        >
          {" "}
          Add more
        </Button>
      </label>
    </div>
    </>
    </>
  );
};

export default AttachFile;
