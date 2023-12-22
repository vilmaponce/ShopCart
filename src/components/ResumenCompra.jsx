import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import Paper from '@mui/material/Paper';


function ResumenCompra({ carrito, informacionPago, total }) {
  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <div>
        <h2>Resumen de la Compra</h2>
        <div>
          <h3>Productos en el Carrito:</h3>
          {/* Lógica para mostrar los productos en el carrito */}
        </div>
        <div>
          <h3>Total: ${total}</h3>
        </div>
        <div>
          <h3>Información de Pago:</h3>
          <p>Nombre del Cliente: {informacionPago.nombreCliente}</p>
          <p>Apellido del Cliente: {informacionPago.apellidoCliente}</p>
          <p>Nombre de la Tarjeta: {informacionPago.nombreTarjeta}</p>
          <p>Número de Tarjeta: {informacionPago.numeroTarjeta}</p>
          {/* Otras propiedades de información de pago */}
        </div>
      </div>
    </Paper>
  );
}

export default ResumenCompra;
