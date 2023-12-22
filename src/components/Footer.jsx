import React from 'react';
import { Paper, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Paper square elevation={3} style={{ backgroundColor: '#f8f9fa', padding: '10px', textAlign: 'center' }}>
      <Typography variant="body2">&copy; 2023 ShopCart-Vilma Ponce</Typography>

      {/* Enlace con icono GitHub */}
      <div style={{ marginTop: '10px' }}>
        
        <Link href="https://github.com/vilmaponce" target="_blank" color="inherit">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            style={{ width: '30px', height: '30px', marginRight: '10px', cursor: 'pointer' }}
          />
        </Link>
      </div>
    </Paper>
  );
}

export default Footer;

