
import React from 'react';
import { Button as MuiButton } from '@mui/material';

function Button({ children, onClick, variant, color, ...props }) {
  return (
    <MuiButton variant={variant || 'contained'} color={color || 'primary'} onClick={onClick} {...props}>
      {children}
    </MuiButton>
  );
}

export default Button;
