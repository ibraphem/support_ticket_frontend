import React from "react";
import { Paper, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ImageIcon from "@material-ui/icons/Image";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import GifIcon from "@material-ui/icons/Gif";

const ReplyCard = ({ name, message, files, role }) => {
  const paperStyle = {
    margin: "10px 80px 30px 80px",
    borderRadius: "10px",
  };
  return (
    <Paper elevation={10} style={paperStyle}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} style={{ margin: "0px 80px" }}>
          <IconButton edge="start" color="primary">
            <PersonIcon />
            <Typography
              color="primary"
              style={{ marginLeft: "20px", fontWeight: "bolder" }}
            >
              {name}
            </Typography>
          </IconButton>
          <p
            style={{
              marginTop: "-15px",
              color: "grey",
              fontSize: "13px",
            }}
          >
            <i>{role && role === "Agent" ? "Service Agent" : "Client"}</i>
          </p>
          <Divider />
          <Typography style={{ padding: "20px 0px" }}>{message}</Typography>
          {files?.length > 0 ? (
            <Grid item xs={12} sm={12}>
              <Typography
                color="primary"
                style={{ marginLeft: "7px", fontWeight: "bold" }}
              >
                Attachments
              </Typography>
              <>
                {files.map((file) => (
                  <a
                    rel="noopener noreferrer"
                    key={file.id}
                    href={"http://localhost:8000/uploads/" + file.file_name}
                    target="_blank"
                  >
                    {file.file_name.toLowerCase().split(".").pop() === "jpg" ||
                    file.file_name.toLowerCase().split(".").pop() === "png" ||
                    file.file_name.toLowerCase().split(".").pop() === "jpeg" ? (
                      <IconButton size="medium" style={{ color: "#cc0000" }}>
                        <ImageIcon fontSize="large" />
                      </IconButton>
                    ) : file.file_name.toLowerCase().split(".").pop() ===
                      "pdf" ? (
                      <IconButton style={{ color: "#ff0000" }} size="medium">
                        <PictureAsPdfIcon fontSize="large" />
                      </IconButton>
                    ) : file.file_name.toLowerCase().split(".").pop() ===
                        "doc" ||
                      file.file_name.toLowerCase().split(".").pop() ===
                        "docx" ? (
                      <IconButton style={{ color: "#2b579a" }} size="medium">
                        <FileCopyIcon fontSize="large" />
                      </IconButton>
                    ) : file.file_name.toLowerCase().split(".").pop() ===
                      "gif" ? (
                      <IconButton size="medium" style={{ color: "#000" }}>
                        <GifIcon fontSize="large" />
                      </IconButton>
                    ) : (
                      <IconButton size="medium">
                        <InsertDriveFileIcon fontSize="large" />
                      </IconButton>
                    )}
                  </a>
                ))}
              </>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReplyCard;
