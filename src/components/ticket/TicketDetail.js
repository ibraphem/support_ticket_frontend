import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@material-ui/core";
import TicketCard2 from "../shared/TicketCard2";
import Message from "../shared/Message";
import CancelIcon from "@material-ui/icons/Cancel";
import AttachFile from "../shared/AttachFile";
import SubmitButton from "../shared/SubmitButton";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL } from "../../components/Config";
import SuccessAlerts from "../alerts/SuccessAlerts";
import ErrorAlerts from "../alerts/ErrorAlerts";
import { useStateValue } from "../../StateProvider";
import moment from "moment";
import ReplyCard from "../shared/ReplyCard";
import Title from "../shared/Title";
import { Redirect } from "react-router-dom";

const TicketDetail = () => {
  const subtitleStyle = {
    margin: "10px 80px 10px 80px",
    fontWeight: "bold",
  };

  const paperStyle = {
    padding: "0px 80px",
    margin: "40px 80px 50px 80px",
    borderRadius: "10px",
  };

  let params = useParams();
  let { ticket_id, file_id } = params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState("");
  const [ticket, setTicket] = useState("");
  const [replies, setReplies] = useState([]);
  const [allUploads, setAllUploads] = useState([]);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(`${URL}/detail/${ticket_id}/${file_id}`).then((response) => {
      console.log(response.data.ticket[0]);
      setTicket(response.data.ticket[0]);
      setFiles(response.data.files);
      setReplies(response.data.replies);
    });
  }, [ticket_id, file_id]);

  const [{ user_id, role }] = useStateValue();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFileUpload = (event) => {
    setFiles(event.target.files[0]);
  };
  const handleAddUpload = () => {
    if (files === {} || files === "") {
      return;
    } else {
      setAllUploads([...allUploads, files]);
      setFiles("");
    }
  };

  const handleRemoveUpload = (id) => {
    const values = [...allUploads];
    values.splice(id, 1);
    setAllUploads(values);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const close = () => {
    setIserror(null);
    setAlertMessage("");
  };

  const saveReply = async (e) => {
    //let dt = [{name: "kunle", city:"London"}, {name:"Tola", city:"New York"}];
    let upload_files = [...allUploads, files];
    console.log(upload_files);
    let dateTime = moment().format("YYYY-MM-DD HH:mm:ss");

    setIsLoading(true);

    e.preventDefault();
    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("message", message);
    data.append("user_id", user_id);
    data.append("ticket_id", ticket_id);
    data.append("date", dateTime);

    upload_files.forEach((upload_file) => {
      //   console.log(upload_file);
      if (upload_file !== "") {
        data.append("uploads[]", upload_file);
      }
    });

    await axios
      .post(`${URL}/save/reply`, data)
      .then((response) => {
        if (response) {
          console.log(response.data);
          setReplies(response.data);
          setIserror(false);
          setAlertMessage(
            "Your reply was submitted successfully. An agent will respond shortly"
          );
          setName("");
          setEmail("");
          setMessage("");
          setFiles("");
          setAllUploads([]);
          setIsLoading(false);
        } else {
          setIserror(true);
          setAlertMessage(
            "Oops Something went wrong while trying to submit your ticket. Try again!!!"
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIserror(true);
        setAlertMessage("Oops, something went wrong");
        setIsLoading(false);
      });
  };

  const checkStatus = () => {
    if (ticket.status === "Closed") {
      return true;
    } else {
      return false;
    }
  };

  const rerender = (ticketing) => {
    setTicket(ticketing);
  };

  return (
    <>
      {role === "Customer" || role === "Agent" ? (
        <>
          <Title
            heading="Detailed Ticket"
            ticketID={ticket_id}
            status={checkStatus}
            rerender={rerender}
            statusValue={ticket.status}
          />
          <>
            <Typography color="primary" style={subtitleStyle}>
              Ticket Information
            </Typography>
            <TicketCard2 ticket={ticket} />
          </>
          <>
            <Typography color="primary" style={subtitleStyle}>
              Reply
            </Typography>
            <>
              <div style={subtitleStyle}>
                {iserror ? (
                  <ErrorAlerts message={alertMessage} close={close} />
                ) : null}
                {iserror === false ? (
                  <SuccessAlerts message={alertMessage} close={close} />
                ) : null}
              </div>
              <form onSubmit={saveReply}>
                <Paper elevation={10} style={paperStyle}>
                  <Grid container spacing={8}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Enter Email Address"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Message
                        messageValue={message}
                        messageChange={handleMessageChange}
                        detail="detail"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      {allUploads?.length > 0 ? (
                        <>
                          {allUploads.map((allUpload, index) => (
                            <div style={{ marginBottom: "10px" }} key={index}>
                              <TextField
                                variant="outlined"
                                size="small"
                                InputProps={{ readOnly: true }}
                                style={{ width: "70%", marginLeft: "115px" }}
                                value={allUpload?.name}
                              />
                              <Button
                                variant="contained"
                                color="secondary"
                                style={{ float: "right" }}
                                startIcon={<CancelIcon />}
                                onClick={() => handleRemoveUpload(index)}
                              >
                                {" "}
                                Remove
                              </Button>
                            </div>
                          ))}
                        </>
                      ) : null}

                      <AttachFile
                        fileToUploads={files}
                        handleRemoveUpload={handleRemoveUpload}
                        handleAddUpload={handleAddUpload}
                        handleFileUpload={handleFileUpload}
                      />
                      <span style={{ fontSize: 12, color: "primary" }}>
                        Allowed file extensions: .jpg, .gif, .jpeg, .png, .pdf,
                        zip, .doc, .docx .docx
                      </span>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
                      <SubmitButton
                        color="primary"
                        label="Submit"
                        type="submit"
                        isLoading={isLoading}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            </>{" "}
            {replies?.length > 0 ? (
              <>
                {replies.map((reply) => (
                  <ReplyCard
                    key={reply.id}
                    name={reply.name}
                    message={reply.message}
                    files={reply.files}
                    role={reply.user?.role}
                  />
                ))}
              </>
            ) : null}
            <ReplyCard
              name={ticket.name}
              message={ticket.message}
              files={files}
            />
          </>
        </>
      ) : (
        <Redirect to="/unauthorized" />
      )}
    </>
  );
};

export default TicketDetail;
