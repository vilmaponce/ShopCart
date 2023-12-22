import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Hidden from '@mui/material/Hidden';
import confirmarCompra from './confirmarCompra';

function Header({ carrito, informacionPago, calcularTotal }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
 

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmCompra = () => {
    handleCloseModal();
    confirmarCompra(carrito, informacionPago, calcularTotal);
  };

  

  return (
    <AppBar position="static" style={{ backgroundColor: '#3f51b5' }}>
      <Toolbar>
        {/* Menú hamburguesa visible solo en pantallas pequeñas */}
        <Hidden mdUp>
          <IconButton
            size="large"
            aria-label="Abrir menú"
            color="inherit"
            onClick={handleMenuOpen}
            
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <img
          src="/public/tienda.png" 
          alt="Logo"
          style={{ width: '50px', height: '50px', marginRight: '10px' }} // Ajusta el tamaño y márgenes 
        />
        <Typography variant="h8" style={{ flexGrow: 0 }}>
          SHOPCART
        </Typography>

        <div style={{ flexGrow: 1 }} />

        <div>
        
          <IconButton
            aria-label="cuenta del usuario actual"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="error"
            
          >
          <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Inicio</MenuItem>
            <MenuItem onClick={handleMenuClose}>Blog</MenuItem>
            <MenuItem onClick={handleMenuClose}>Contacto</MenuItem>
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Menu>
        </div>

        
      </Toolbar>
    </AppBar>
  );
}

export default Header;
