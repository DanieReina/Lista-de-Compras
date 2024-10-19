const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: 'Milk', purchased: false },
  { id: 2, name: 'Eggs', purchased: false },
];

// GET /items - Obtener la lista de artículos
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items - Agregar un artículo aleatorio desde Fake Store API
app.post('/items', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    // Selecciona un producto aleatorio
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    const newItem = {
      id: items.length + 1,
      name: randomProduct.title,
      purchased: false
    };

    items.push(newItem);
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos de Fake Store API' });
  }
});

// PUT /items/:id - Marcar como comprado
app.put('/items/:id', (req, res) => {
  const item = items.find(item => item.id == req.params.id);
  if (item) {
    item.purchased = !item.purchased;
    res.json(item);
  } else {
    res.status(404).send('Item no encontrado');
  }
});

// DELETE /items/:id - Eliminar un artículo
app.delete('/items/:id', (req, res) => {
  items = items.filter(item => item.id != req.params.id);
  res.status(204).send();
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
