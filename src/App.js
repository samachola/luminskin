import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { Animated } from 'react-animated-css';
import { PRODUCTS } from './gql/queries';
import './App.css';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currency, setCurrency] = useState('USD');

  const addToCart = ({id, image_url, title, price} ) => {
    const product = Object.assign({}, { id, image_url, title, price, quantity: 1 });
    setShoppingCart([...shoppingCart, product]);
    setShowCart(!showCart);
  }
  const { loading, error, data } = useQuery(PRODUCTS(currency));
  const Cart = () => (
    <div className="cart">
      <div className="overlay"></div>
      <div className="items">
        <div className="close">
          <h4 onClick={() => setShowCart(!showCart)}>Close</h4>
        </div>

        <div className="cartItem">
          {shoppingCart.map((product) => (
            <div key={product.id} className="item">
              <p>{product.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const Products = () => {
    return data.products.map(({ id, title, price, image_url }) => (
      <div className="product" key={id}>
        <img src={image_url} alt={title} width="100" height="100" />
        <p className="title">{title}</p>
        <p className="price">From: {currency} {price}</p>
        <button onClick={() => addToCart({image_url, title, price})}>Add to Cart</button>
      </div>
    ));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="main">
      {
        showCart ? <Cart /> : ''
      }
      <button onClick={() => setShowCart(!showCart)}><p>Cart</p></button>

      <div className="container">
        <Products />
      </div>
    </div>
  );
}

export default App;
