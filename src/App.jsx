import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ResumenCompra from './components/ResumenCompra';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [informacionPago, setInformacionPago] = useState({
    nombreCliente: '',
    apellidoCliente: '',
    nombreTarjeta: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
  });
  const [mostrarNumerosCVV, setMostrarNumerosCVV] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [preciosDeAPI, setPreciosDeAPI] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProductos = await axios.get('https://fakestoreapi.com/products');
        const productosData = responseProductos.data;
        setProductos(productosData);

        const responsePreciosAPI = await axios.get('https://fakestoreapi.com/products');
        const preciosAPI = responsePreciosAPI.data;
        setPreciosDeAPI(preciosAPI);

        console.log('Precios de la API:', preciosAPI);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const agregarAlCarrito = (producto) => {
    const { id, title, price } = producto;
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
      const nuevoCarrito = carrito.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { id, nombre: title, cantidad: 1, precio: price }]);
    }
  };

  const ajustarCantidad = (id, cantidad) => {
    setCarrito(
      carrito.map((item) => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  useEffect(() => {
    console.log('Carrito actualizado:', carrito);
  }, [carrito]);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      const precio = typeof item.precio === 'number' ? item.precio : 0;
      const cantidad = typeof item.cantidad === 'number' ? item.cantidad : 0;
      return total + precio * cantidad;
    }, 0);
  };

  const simularCompra = () => {
    const errors = [];

    if (!informacionPago.nombreCliente || informacionPago.nombreCliente.trim() === '') {
      errors.push('Por favor, ingrese un nombre válido del cliente.');
    }

    if (!informacionPago.apellidoCliente || informacionPago.apellidoCliente.trim() === '') {
      errors.push('Por favor, ingrese un apellido válido del cliente.');
    }

    if (!informacionPago.nombreTarjeta || informacionPago.nombreTarjeta.trim() === '') {
      errors.push('Por favor, ingrese un nombre válido en la tarjeta.');
    }

    if (!/^\d{16}$/.test(informacionPago.numeroTarjeta)) {
      errors.push('Por favor, ingrese un número de tarjeta válido (16 dígitos numéricos).');
    }

    if (!/^(0[1-9]|1[0-2])-(\d{2}|\d{4})$/.test(informacionPago.fechaExpiracion)) {
      errors.push('Por favor, ingrese una fecha de expiración válida (formato: MM-AA o MM-AAAA).');
    }

    if (!/^\d{3}$/.test(informacionPago.cvv)) {
      errors.push('Por favor, ingrese un código CVV válido (3 dígitos numéricos).');
    }

    setValidationErrors(errors);

    // Mostrar alerta de agradecimiento si no hay errores
    if (errors.length === 0) {
      
      console.log('Simulación de compra:');
      console.log('Productos en el carrito:', carrito);
      console.log('Información de pago:', informacionPago);
      console.log('Total del carrito:', calcularTotal());
      console.log('Compra simulada. ¡Gracias por comprar!');
    }
  };

  const handleConfirmCompra = () => {
    // acciones necesarias al confirmar la compra

    // Cierra el modal después de realizar las acciones
    handleCloseModal();
  };

  const borrarProducto = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <Header />
      <div id="inicio">
        {/* Contenido principal */}
      </div>
      <Typography variant="h2" align="center" gutterBottom>
        Productos Disponibles
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <ProductList productos={productos} agregarAlCarrito={agregarAlCarrito} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Cart carrito={carrito} ajustarCantidad={ajustarCantidad} calcularTotal={calcularTotal} borrarProducto={borrarProducto} />
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <Typography variant="h4">Proceder al Pago</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <div style={{ marginBottom: '20px' }}>
                <TextField
                  label="Nombre del Cliente"
                  fullWidth
                  value={informacionPago.nombreCliente}
                  onChange={(e) => setInformacionPago(prevState => ({ ...prevState, nombreCliente: e.target.value }))}
                />
              </div>
            </Grid>
            <Grid item xs={6} sm={6}>
              <div style={{ marginBottom: '20px' }}>
                <TextField
                  label="Apellido del Cliente"
                  fullWidth
                  value={informacionPago.apellidoCliente}
                  onChange={(e) => setInformacionPago(prevState => ({ ...prevState, apellidoCliente: e.target.value }))}
                />
              </div>
            </Grid>
          </Grid>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Nombre en la Tarjeta"
              fullWidth
              value={informacionPago.nombreTarjeta}
              onChange={(e) => setInformacionPago(prevState => ({ ...prevState, nombreTarjeta: e.target.value }))}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="Número de Tarjeta"
              fullWidth
              value={informacionPago.numeroTarjeta}
              onChange={(e) => setInformacionPago({ ...informacionPago, numeroTarjeta: e.target.value })}
            />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
                label="Fecha de Expiración"
                fullWidth
                value={informacionPago.fechaExpiracion}
                onChange={(e) =>
                  setInformacionPago({ ...informacionPago, fechaExpiracion: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <div style={{ marginBottom: '20px' }}>
                <TextField
                  label="CVV"
                  fullWidth
                  value={mostrarNumerosCVV ? informacionPago.cvv : 'xxx'}
                  onChange={(e) => setInformacionPago({ ...informacionPago, cvv: e.target.value })}
                  onFocus={() => setMostrarNumerosCVV(true)}
                  onBlur={() => setMostrarNumerosCVV(false)}
                />
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={simularCompra}
              >
                Validar datos ingresados 
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success" onClick={handleOpenModal}>
                Confirmar Compra
              </Button>
            </Grid>
          </Grid>

          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            style={{
              borderRadius: '10px',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <DialogTitle>Confirmar Compra</DialogTitle>
            <DialogContent>
              <Typography>
                ¿Desea confirmar la compra?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                <Typography style={{ backgroundColor: 'red', color: 'white' }}>No</Typography>
              </Button>
              <Button onClick={handleConfirmCompra} color="primary">
                <Typography style={{ backgroundColor: 'green', color: 'white' }}>Sí, confirmar</Typography>
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      {validationErrors.map((error, index) => (
        <div key={index} style={{ color: 'red' }}>
          {error}
        </div>
      ))}
      <ResumenCompra
        carrito={carrito}
        informacionPago={informacionPago}
        total={calcularTotal()}
      />
      <Footer />
    </Container>
  );
}

export default App;
