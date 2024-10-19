import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvailableProducts.css';

const AvailableProducts = ({ addItemToList }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos', error);
    }
  };



  return (
    <div className="grid-container">
      {products.map((product) => (
        <div className="grid-item" key={product.id}>
          <img src={product.image} alt={product.title} className="product-image" />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <button onClick={() => addItemToList(product)}>Agregar a la lista</button>
        </div>
      ))}
    </div>
  );
};

export default AvailableProducts;