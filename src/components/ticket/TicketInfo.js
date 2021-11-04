import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@material-ui/core";
import { Department, Services, Priority } from "../shared/data";
import SelectField from "../shared/SelectField";
import Message from "../shared/Message";
import AttachFile from "../shared/AttachFile";
import SubmitButton from "../shared/SubmitButton";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { URL } from "../../components/Config";
import moment from "moment";
import CancelIcon from "@material-ui/icons/Cancel";
import { useHistory } from "react-router-dom";
import SuccessAlerts from "../alerts/SuccessAlerts";
import ErrorAlerts from "../alerts/ErrorAlerts";
import Title from "../shared/Title";
import { Redirect } from "react-router-dom";

const TicketInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [services, setServices] = useState("");
  const [priority, setPriority] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState("");
  const [allUploads, setAllUploads] = useState([]);
  const [iserror, setIserror] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [{ user_id, role }] = useStateValue();
  const history = useHistory();

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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleServicesChange = (e) => {
    setServices(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  //console.log(allUploads);

  const saveTicket = async (e) => {
    //let dt = [{name: "kunle", city:"London"}, {name:"Tola", city:"New York"}];
    let upload_files = [...allUploads, files];
    let dateTime = moment().format("YYYY-MM-DD HH:mm:ss");

    setIsLoading(true);

    e.preventDefault();
    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("department", department);
    data.append("service", services);
    data.append("priority", priority);
    data.append("subject", subject);
    data.append("message", message);
    data.append("customer_id", user_id);
    data.append("date", dateTime);

    upload_files.forEach((upload_file) => {
      console.log(upload_file);
      if (upload_file !== "") {
        data.append("uploads[]", upload_file);
      }
    });

    await axios
      .post(`${URL}/save/ticket`, data)
      .then((response) => {
        if (response.data === "success") {
          setIserror(false);
          setAlertMessage(
            "Ticket raised was successful. An agent will respond shortly"
          );
          setName("");
          setEmail("");
          setDepartment("");
          setServices("");
          setPriority("");
          setSubject("");
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

    /*   try {
      const response = await axios.post(`${URL}/save/ticket`, data);
      console.log(response);
    } catch {
      setIserror(true);
      setAlertMessage("Access Denied!!! Incorrect Login Credential");
      return false;
    } */
  };

  const cancel = () => {
    history.push("/dashboard");
  };

  const close = () => {
    setIserror(null);
    setAlertMessage("");
  };

  const paperStyle = {
    padding: "0px 80px",
    margin: "0px 20px 50px 30px",
    borderRadius: "10px",
  };
  const subtitleStyle = {
    margin: "0px 80px 40px 80px",
    fontWeight: "bold",
  };

  return (
    <>
      {role === "Customer" ? (
        <>
          <Title heading="Open Support Ticket" />
          <form onSubmit={saveTicket}>
            <>
              <Typography color="primary" style={subtitleStyle}>
                Ticket Information
              </Typography>
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
                  <Grid item xs={12} sm={4}>
                    <SelectField
                      label="Select department"
                      list={Department}
                      value={department}
                      onChange={handleDepartmentChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SelectField
                      label="Select related service"
                      list={Services}
                      value={services}
                      onChange={handleServicesChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <SelectField
                      label="Select priority"
                      list={Priority}
                      value={priority}
                      onChange={handlePriorityChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </>
            <>
              <Typography color="primary" style={subtitleStyle}>
                Message
              </Typography>
              <Paper elevation={10} style={paperStyle}>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={12}>
                    <Message
                      subjectValue={subject}
                      subjectChange={handleSubjectChange}
                      messageValue={message}
                      messageChange={handleMessageChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </>
            <>
              <Typography color="primary" style={subtitleStyle}>
                Attachments
              </Typography>
              <Paper elevation={10} style={paperStyle}>
                <Grid container spacing={8}>
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
                </Grid>
              </Paper>
              <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} sm={4}></Grid>
                <Grid item xs={12} sm={4}>
                  <SubmitButton
                    color="primary"
                    label="Submit"
                    type="submit"
                    isLoading={isLoading}
                  />
                  <SubmitButton label="Cancel" type="button" onClick={cancel} />
                </Grid>
                <Grid item xs={12} sm={4}></Grid>
              </Grid>
            </>
          </form>
          <div style={subtitleStyle}>
            {iserror ? (
              <ErrorAlerts message={alertMessage} close={close} />
            ) : null}
            {iserror === false ? (
              <SuccessAlerts message={alertMessage} close={close} />
            ) : null}
          </div>
        </>
      ) : (
        <Redirect to="/unauthorized" />
      )}
    </>
  );
};

export default TicketInfo;
