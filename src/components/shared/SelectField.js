import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const SelectField = ({ label, list, value, onChange }) => {
  return (
    <TextField
      select
      label={label}
      InputLabelProps={{ shrink: true }}
      fullWidth
      required
      value={value}
      onChange={onChange}
    >
      {list?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
