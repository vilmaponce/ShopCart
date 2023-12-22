
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Sidebar({ open, toggleSidebar }) {
  return (
    <Drawer anchor="right" open={open} onClose={toggleSidebar}>
      <List>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <IconButton color="inherit" edge="end">
              <ShoppingCartIcon />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Cerrar Carrito" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
