import React from 'react';
import Button from '@material-ui/core/Button';

const SubmitButton = ({color, label, type}) => {
    return (
        <Button variant="contained" type={type} color={color} style={{margin:"10px"}}>
        {label}
      </Button>
    );
};

export default SubmitButton;