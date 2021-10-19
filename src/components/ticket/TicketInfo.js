import React, {useState} from "react";
import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import { Department, Services, Priority } from "../shared/data";
import SelectField from "../shared/SelectField";
import Message from "../shared/Message";
import AttachFile from "../shared/AttachFile";
import SubmitButton from "../shared/SubmitButton"
import {URL} from "../../components/Config";
import axios from "axios";

const TicketInfo = () => {

const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [services, setServices] = useState("");
  const [priority, setPriority] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("")
  const [allUploadedFiles, setAllUploadedFiles] = useState([])
  const [fileToUploads, setFileToUploads] = useState(null)
  const [iserror, setIserror] = useState();
  const [alertMessage, setAlertMessage] = useState(null);


    const handleFileUpload = (event) => {
    //  console.log(event.target.files[0])
    setFileToUploads(event.target.files[0])
  };
  const handleAddUpload = (event) => {
    event.preventDefault()
    setAllUploadedFiles([...allUploadedFiles,fileToUploads])
    setFileToUploads(null)
  
  }

 const handleRemoveUpload = index => {
    const values  = [...allUploadedFiles];
    values.splice(index, 1);
    setAllUploadedFiles(values);
  }

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


const saveTicket = async(e) => {
   e.preventDefault();
  const data = {
      name,
      email,
      department,
      services,
      priority,
      subject,
      message,
      files: [...allUploadedFiles,fileToUploads]
    };
    
    console.log(data)
    try{
      const response = await axios.post(`${URL}/save/ticket`, data)
      console.log(response)
    } catch {
       setIserror(true);
      setAlertMessage("Access Denied!!! Incorrect Login Credential");
      return false;
    }
}

console.log("file",fileToUploads);
console.log("all",allUploadedFiles)

  const paperStyle = {
    padding: "0px 80px",
    margin: "0px 80px 50px 80px",
    borderRadius: "10px",
  };
  const subtitleStyle = {
    margin: "0px 80px 40px 80px",
    fontWeight: "bold",
  };

  return (
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
              <SelectField label="Select department" list={Department} value={department}
                onChange={handleDepartmentChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField label="Select related service" list={Services} value={services}
                onChange={handleServicesChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <SelectField label="Select priority" list={Priority} value={priority}
                onChange={handlePriorityChange} />
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
              <Message subjectValue={subject}
                subjectChange={handleSubjectChange} messageValue={message}
                messageChange={handleMessageChange} />
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
              <AttachFile 
              allUploadedFiles={allUploadedFiles} 
              fileToUploads={fileToUploads} 
              handleRemoveUpload={handleRemoveUpload} 
              handleAddUpload={handleAddUpload}
              handleFileUpload={handleFileUpload}
               />
              <span style={{fontSize:12, color:"primary"}}>Allowed file extensions: .jpg, .gif, .jpeg, .png, .pdf, .doc, .docx</span>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={8} >
        <Grid item xs={12} sm={4}></Grid>
          <Grid item xs={12} sm={4} >
            <SubmitButton color="primary" label="Submit" type="submit" />
            <SubmitButton label="Cancel" type="button"/>
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
      </>
    </form>
  );
};

export default TicketInfo;
