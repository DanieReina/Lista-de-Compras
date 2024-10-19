import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

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

// POST /items - Agregar un articulo  desde Fake Store API
app.post('/items', (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'El nombre del producto es obligatorio' });
    }
  
    const newItem = {
      id: items.length + 1,
      name,
      purchased: false,
    };
  
    items.push(newItem);
    res.json(newItem);
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


// GET /all-products - Obtener todos los productos de Fake Store API
app.get('/all-products', async (req, res) => {
    try {   
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      res.json(products); // Devolver los productos en formato JSON
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos de Fake Store API' });
    }
  });
  

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
