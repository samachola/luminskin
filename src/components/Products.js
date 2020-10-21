import React from 'react';
const Products = ({ data, currency, shoppingCart, setShoppingCart, setShowCart, showCart }) => {
	
	const addToCart = ({ id, image_url, title, price }) => {

		const cart = shoppingCart.filter(product => product.id === id);

		if (cart.length) {
			const items = shoppingCart.map(product => {
				if (product.id === cart[0].id) {
					product.quantity++
				}
	
				return product;
			})

			setShoppingCart(items);
		} else {

			const product = Object.assign({}, { id, image_url, title, price, quantity: 1 });
			setShoppingCart([...shoppingCart, product]);
		}

    setShowCart(!showCart);
	}

	return data.products.map(({ id, title, price, image_url }) => (
		<div className="product" key={id}>
			<img src={image_url} alt={title} width="100" height="100" />
			<p className="title">{title}</p>
			<p className="price">From: {currency} {price}</p>
			<button onClick={() => addToCart({id, image_url, title, price})}>Add to Cart</button>
		</div>
	));
}

export default Products;