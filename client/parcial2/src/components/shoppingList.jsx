import React from 'react';
import Item from './item';

const ShoppingList = ({ items, togglePurchased, deleteItem }) => {
  return (
    <ul>
      {items.map(item => (
        <Item 
          key={item.id} 
          item={item} 
          togglePurchased={togglePurchased} 
          deleteItem={deleteItem} 
        />
      ))}
    </ul>
  );
};

export default ShoppingList;
