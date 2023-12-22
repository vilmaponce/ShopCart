import React from 'react';
import { Grid, Paper, Card, CardContent, Typography, Button } from '@mui/material';
import '../styles/ProductList.css'; 

function ProductList({ productos, agregarAlCarrito }) {
  return (
    <Grid container spacing={2}>
      {productos.map((producto) => (
        <Grid item key={producto.id} xs={12} sm={6} md={4} lg={3}>
          <Paper>
            <Card className="product-card">
              <CardContent>
                <Typography variant="h5">{producto.title}</Typography>
                <img src={producto.image} alt={producto.title} style={{ width: '100%', maxWidth: '100%' }} />
                <Typography variant="body1">Precio: ${producto.price || producto.precio}</Typography>
                <Button variant="contained" onClick={() => agregarAlCarrito(producto)}>
                  Agregar al carrito
                </Button>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
