import React from 'react';
import { useCart } from './Container';
import productsData from './data/products';
import ProductCard from './ProductCard';
import CartPage from './CartPage';

const Content = () => {
  const { pageType, cart, getCartTotalPrice } = useCart();
  
  const getFilteredProducts = () => {
    switch(pageType) {
      case 'tv':
        return productsData.filter(p => p.category === 'tv');
      case 'phone':
        return productsData.filter(p => p.category === 'phone');
      case 'laptop':
        return productsData.filter(p => p.category === 'laptop');
      case 'cart':
        return [];
      default:
        return productsData;
    }
  };

  // Страница корзины
  if (pageType === 'cart') {
    return <CartPage products={productsData} />;
    
  }

  // Страницы с товарами
  const filteredProducts = getFilteredProducts();
  
  return (
     <div className="products-grid">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Content;