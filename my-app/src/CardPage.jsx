import React from 'react';
import './CartPage.css';

const CartPage = ({ cart, products, removeFromCart, updateCartQuantity, totalPrice }) => {
  
  const cartItems = Array.from(cart.entries()).map(([id, quantity]) => {
    const product = products.find(p => p.id === id);
    return { ...product, quantity };
  });

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart!</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.images?.[0]} alt={item.model} />
            
            <div className="cart-item-details">
              <h3>{item.model}</h3>
              <p>{item.make}</p>
              <p className="price">{item.price}</p>
            </div>
            
            <div className="cart-item-quantity">
              <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            
            <div className="cart-item-total">
              ${item.price * item.quantity}
            </div>
            
            <button 
              className="remove-button"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h3>Total: ${totalPrice}</h3>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;