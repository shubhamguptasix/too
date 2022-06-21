import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CustomButton=(props)=> {

    const {label,onClick}=props

  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="contained" onClick={onClick} >{label}</Button>
      
    </Stack>
  );
}

export default CustomButton