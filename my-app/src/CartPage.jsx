import { useState } from 'react';
import { useCart } from './Container';
import productsData from './data/products';
import './CartPage.css';

// Иконка корзины/мусорки (можно заменить на SVG или emoji)
const TrashIcon = () => <span role="img" aria-label="delete">🗑️</span>;

const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, setPageType } = useCart();
  const [products] = useState(productsData);

  // Получаем полные данные товаров из корзины
  const cartItems = Array.from(cart.entries()).map(([id, quantity]) => {
    const product = products.find(p => p.id === id);
    return { ...product, quantity };
  });

  // Форматирование цены с двумя знаками
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // Подсчет subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Налог 8%
  const tax = subtotal * 0.08;
  
  // Итого
  const total = subtotal + tax;

  // Обработчик кнопки "Continue Shopping"
  const handleContinueShopping = () => {
    setPageType('techstore');
  };

  // Обработчик кнопки "Back to Shopping"
  const handleBackToShopping = () => {
    setPageType('techstore');
  };

  // Если корзина пуста
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button className="continue-shopping-btn" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      
      <div className="cart-layout">
        {/* Список товаров */}
        <div className="cart-items">
          <div className="cart-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>
          
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              {/* Миниатюра и информация */}
              <div className="cart-item-info">
                <img 
                  src={item.images?.[0]} 
                  alt={item.model}
                  className="cart-item-image"
                />
                <div>
                  <div className="cart-item-brand">{item.make || item.brand}</div>
                  <div className="cart-item-model">{item.model}</div>
                </div>
              </div>
              
              {/* Кнопки управления количеством */}
              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              
              {/* Цена за позицию */}
              <div className="cart-item-total">
                {formatPrice(item.price * item.quantity)}
              </div>
              
              {/* Кнопка удаления */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
        
        {/* Сводка заказа */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>{formatPrice(tax)}</span>
          </div>
          
          <div className="summary-row shipping">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
          
          <button className="back-shopping-btn" onClick={handleBackToShopping}>
            Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;