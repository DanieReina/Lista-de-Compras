import React from 'react';
import '../App.css';

const Item = ({ item, togglePurchased, deleteItem }) => {
  return (
    <li style={{ 
      textDecoration: item.purchased ? 'line-through' : 'none', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '5px', 
      marginBottom: '10px',
      backgroundColor: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',  
      alignItems: 'center',     
      textAlign: 'center'       
    }}>
      <span style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '18px' }}>
        {item.name}
      </span>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}> 
        <button 
          onClick={() => togglePurchased(item.id)} 
          style={{ 
            backgroundColor: '#000000', 
            color: 'white', 
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer' 
          }}>
          {item.purchased ? 'Desmarcar' : 'Marcar como comprado'}
        </button>
        <button 
          onClick={() => deleteItem(item.id)} 
          style={{ 
            backgroundColor: '#FF885B', 
            color: 'white', 
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Item;
