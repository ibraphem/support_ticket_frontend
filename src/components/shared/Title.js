import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid } from "@material-ui/core";
import { useStateValue } from "../../StateProvider";
import { URL } from "../../components/Config";
import axios from "axios";

const Title = ({ heading, ticketID, status, rerender, statusValue }) => {
  const [{ role }] = useStateValue();
  const [isClosed, setIsClosed] = useState(
    statusValue === "Closed" ? true : false
  );

  const handleChangeStatus = (event) => {
    axios
      .get(`${URL}/status/${ticketID}/${event.target.value}`)
      .then((response) => {
        rerender(response.data.ticket[0]);
        setIsClosed(!isClosed);
      });
  };

  return (
    <Grid container style={{ padding: "10px 80px" }}>
      <Grid item xs={8} sm={10}>
        <Typography
          color="primary"
          style={{ fontWeight: "bolder", fontSize: "25px" }}
        >
          {heading}
        </Typography>
      </Grid>
      {role === "Agent" && ticketID ? (
        <Grid item xs={4} sm={2} style={{ float: "right" }}>
          <FormControlLabel
            value={statusValue}
            control={
              <Checkbox
                color="primary"
                checked={isClosed}
                onChange={handleChangeStatus}
              />
            }
            label="Marked as Closed"
            labelPlacement="start"
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Title;
