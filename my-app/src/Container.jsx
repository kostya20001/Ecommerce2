import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Container = ({ children }) => {
  const [pageType, setPageType] = useState('tv');
  const [cart, setCart] = useState(new Map());

  const addToCart = (productId, quantity = 1) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);
      const currentQuantity = newCart.get(productId) || 0;
      newCart.set(productId, currentQuantity + quantity);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const newCart = new Map(prevCart);
      newCart.delete(productId);
      return newCart;
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart => {
        const newCart = new Map(prevCart);
        newCart.set(productId, quantity);
        return newCart;
      });
    }
  };

  const clearCart = () => {
    setCart(new Map());
  };

  const getCartTotalCount = () => {
    let total = 0;
    for (const quantity of cart.values()) {
      total += quantity;
    }
    return total;
  };

  const getCartTotalPrice = (products) => {
    let total = 0;
    for (const [id, quantity] of cart.entries()) {
      const product = products.find(p => p.id === id);
      if (product) {
        total += product.price * quantity;
      }
    }
    return total;
  };

    const renderChildren = () => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;
      
      // Передаем пропсы только в Header и Footer
      if (child.type === Header || child.type === Footer) {
        return React.cloneElement(child, {
          pageType,
          setPageType,
          cartTotalCount: getCartTotalCount()
        });
      };

      return child;
    });
  };

const contextValue = {
    pageType,
    setPageType,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotalCount,
    getCartTotalPrice
  };

  return (
    <CartContext.Provider value={contextValue}>
      {renderChildren()}
    </CartContext.Provider>
  );
};

// Создаем Context для доступа из любых компонентов
export const CartContext = React.createContext(null);

// Хук для использования контекста
export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within Container');
  }
  return context;
};

export default Container;