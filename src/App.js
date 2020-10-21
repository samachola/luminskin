import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { Animated } from 'react-animated-css';
import { PRODUCTS } from './gql/queries';
import Cart from './components/Cart';
import Products from './components/Products';
import './App.css';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);


  const { loading, error, data } = useQuery(PRODUCTS(currency));

  useEffect(() => {
    if (data) setCurrencies(data.currency);
  })
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="main">
      {
        showCart ?
          <Cart
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
            showCart={showCart}
            setShowCart={setShowCart}
            currency={currency}
            currencies={currencies}
            setCurrency={setCurrency}
          /> : ''
      }
      <button onClick={() => setShowCart(!showCart)}><p>Cart</p></button>

      <div className="container">
        <Products
          data={data}
          setShoppingCart={setShoppingCart}
          setShowCart={setShowCart}
          showCart={showCart}
          shoppingCart={shoppingCart}
          currency={currency} />
      </div>
    </div>
  );
}

export default App;
