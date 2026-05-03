import React from 'react';
import { useCart } from './Container';
import productsData from './data/products';
import ProductCard from './ProductCard';
import CartPage from './CartPage';

const Content = () => {
  const { pageType } = useCart();
  
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
    return <CartPage />;
    
  }

  // Страницы с товарами
  const filteredProducts = getFilteredProducts();
  
  return (
     <div className="products-grid">
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found</p>
        </div>
      ) : (
        filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default Content;