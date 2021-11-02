import React from "react";
import { TextField } from "@material-ui/core";

const Message = ({
  subjectValue,
  subjectChange,
  messageValue,
  messageChange,
  detail,
}) => {
  return (
    <>
      {detail !== "detail" ? (
        <>
          <TextField
            required
            label="Subject"
            value={subjectValue}
            onChange={subjectChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            style={{ marginBottom: "20px" }}
          />
        </>
      ) : null}

      <TextField
        required
        label="Message"
        value={messageValue}
        onChange={messageChange}
        fullWidth
        multiline
        minRows={6}
        InputLabelProps={{ shrink: true }}
      />
    </>
  );
};

export default Message;
