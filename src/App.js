import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import useDeepCompareEffect from 'use-deep-compare-effect'
import { PRODUCTS } from './gql/queries';
import Cart from './components/Cart';
import Products from './components/Products';
import './App.css';

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);

  const { loading, error, data } = useQuery(PRODUCTS, {variables: {currency: currency}});

  useDeepCompareEffect(() => {
    if (data) {
      const { products } = data;
      setCurrencies(data.currency);

      if (shoppingCart.length) {
        const cart = shoppingCart.map(cartItem => {
          const newProducts = products.filter(product => product.id === cartItem.id);
          cartItem.price = newProducts[0].price;

          return cartItem;
        });

        setShoppingCart(cart);
      }
    };
  }, [data, setCurrencies, shoppingCart])

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
