import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const Title = () => {
  const titleStyle = {
    margin: "10px 20px",
    paddingLeft: "50px",
    minHeight: "80px",
  };

  return (
    <div style={titleStyle}>
      <div>
        <Typography
          color="primary"
          style={{ fontWeight: "bolder", fontSize: "28px" }}
        >
          This is Title
        </Typography>
      </div>
      <div>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Material-UI
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default Title;
