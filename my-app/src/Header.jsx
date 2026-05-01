import './Header.css';
import cart from './assets/cart.svg';
import person from './assets/person.svg';

function Header() {
    return (
    <header className='header'>
      <div>
        <div>
          <button>TechStore</button>
          <nav>
            <a href="TV"> TV </a>
            <a href="Phone"> Phone </a>
            <a href="Laptop"> Laptop </a>
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