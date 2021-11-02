import React from "react";
import ReplyCard from "../shared/ReplyCard";

const Reply = ({ name, message, files }) => {
  return <ReplyCard name={name} message={message} files={files} />;
};

export default Reply;
