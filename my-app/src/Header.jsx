import './Header.css';
import cart from './assets/cart.svg';
import person from './assets/person.svg';
import { useCart } from './Container';
import React from 'react';

const Header = () => {
  const { pageType, setPageType, getCartTotalCount } = useCart();
  
    return (
    <header className='header'>
      <div>
        <div>
          <button
          className={pageType === 'techstore' ? 'active' : ''}
            onClick={() => setPageType('techstore')}
          >
            TechStore
          </button>
          <nav>
        <button 
          className={pageType === 'tv' ? 'active' : ''}
          onClick={() => setPageType('tv')}
        >
          TVs
        </button>
        <button 
          className={pageType === 'phone' ? 'active' : ''}
          onClick={() => setPageType('phone')}
        >
          Phones
        </button>
        <button 
          className={pageType === 'laptop' ? 'active' : ''}
          onClick={() => setPageType('laptop')}
        >
          Laptops
        </button>
        <button 
          className={pageType === 'cart' ? 'active' : ''}
          onClick={() => setPageType('cart')}
        >
          Cart ({getCartTotalCount()})
        </button>
          </nav>
        </div>
        <div>
          <button>
            <img
              src={cart}
              alt="Cart"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
          <button>
            <img
              src={person}
              alt="Person"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
        </div>
      </div>
    </header>
    );
}

export default Header;