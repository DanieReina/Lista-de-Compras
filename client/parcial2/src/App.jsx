import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShoppingList from './components/ShoppingList';
import AvailableProducts from './components/availableProducts';
import './App.css';
import productsImage from './products.png';


function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/items');
    setItems(response.data);
  };

  const addItemToList = async (product) => {
    const newItem = {
      name: product.title,
      purchased: false,
    };

    await axios.post('http://localhost:5000/items', newItem);
    fetchItems();
  };

  const togglePurchased = async (id) => {
    await axios.put(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchItems();
  };

  return (
    <div>
      <div className="image-container">
      <img src={productsImage} alt="Productos disponibles" />
    </div>
      <AvailableProducts addItemToList={addItemToList} />

      <h2 style={{ textAlign: 'center', marginTop: '20px', textDecoration: 'underline' }}>Mi lista de compras</h2>
      <ShoppingList 
        items={items} 
        togglePurchased={togglePurchased} 
        deleteItem={deleteItem} 
      />
    </div>
  );
}

export default App;