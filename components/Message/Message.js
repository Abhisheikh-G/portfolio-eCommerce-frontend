import React from "react";
import Alert from "@material-ui/lab/Alert";

const Message = ({ severity, children }) => {
  return (
    <Alert variant="filled" severity={severity}>
      {children}
    </Alert>
  );
};

export default Message;
