import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  useMediaQuery,
  Tooltip,
  Badge,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

function Cart({ carrito, ajustarCantidad, calcularTotal, borrarProducto }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleAgregarAlCarrito = (producto) => {
    console.log('Carrito antes de agregar:', carrito);
    // Verifica si el producto ya está en el carrito
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, ajusta la cantidad
      ajustarCantidad(producto.id, productoExistente.cantidad + 1);
    } else {
      // Si el producto no está en el carrito, agrega con cantidad 1
      ajustarCantidad(producto.id, 1);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: isSmallScreen ? '20px' : '0' }}>
      <Typography variant="h5" gutterBottom>
        <Tooltip title="Ver Carrito" placement="top">
          <IconButton color="primary">
            <Badge badgeContent={carrito.reduce((total, item) => total + item.cantidad, 0)} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        Carrito de Compras
      </Typography>
      <List>
        {carrito.map((item, index) => (
          <ListItem key={`${item.id}-${index}`}>
            <ListItemText
              primary={`${item.nombre} x${item.cantidad}`}
              secondary={`Precio: $${item.precio * item.cantidad}`}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={() => ajustarCantidad(item.id, item.cantidad - 1)}
                disabled={item.cantidad === 1}
              >
                -
              </Button>
              <Typography>{item.cantidad}</Typography>
              <Button onClick={() => ajustarCantidad(item.id, item.cantidad + 1)}>+</Button>
              <Tooltip title="Quitar del Carrito" placement="top">
                <IconButton onClick={() => borrarProducto(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6">Total: ${calcularTotal()}</Typography>
    </Paper>
  );
}

export default Cart;