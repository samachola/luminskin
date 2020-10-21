import React from 'react';
const Cart = ({ shoppingCart, setShoppingCart, showCart, setShowCart, currency, currencies, setCurrency }) => {
	
	const addItemQuantity = (id) => {
		const cart = shoppingCart.map(product => {
			if (product.id === id) {
				product.quantity++
			}

			return product;
		})

		setShoppingCart(cart);
	}

	const reduceItemQuantity = (id) => {

		const product = shoppingCart.filter(product => product.id === id);
		if (product[0].quantity < 1) {
			removeFromCart(id);
			return;
		}

		const cart = shoppingCart.map(product => {
			if (product.id === id) {
				product.quantity--
			}

			return product;
		})

		setShoppingCart(cart);
	}

	const removeFromCart = (id) => {
		const products = shoppingCart.filter(product => product.id !== id);
		setShoppingCart(products);
	}


	const onChangeCurrency = (value) => {
		console.log('value');
	}
	
	return (
		<div className="cart">
			<div className="overlay"></div>
			<div className="items">
				<div className="close">
					<h4 onClick={() => setShowCart(!showCart)}>Close</h4>
				</div>

				<div className="currency">
					<select name="currency" onChange={(event) => setCurrency(event.target.value)}>
						{currencies.map((value, index) => <option key={index} value={value} selected={value === currency}>{value}</option>)}
					</select>
				</div>

				
				<div className="products">
					{shoppingCart.map(({id, title, image_url, price, quantity}) => (
						<div key={id} className="item">
							<div className="title">
								<p>{title}</p>
								<span role="button" onClick={() => removeFromCart(id)}>𝘅</span>
							</div>

							<div className="scale">
								<div className="quantity">
									<span onClick={() => reduceItemQuantity(id)}>−</span>
									<p>{quantity}</p>
									<span onClick={() => addItemQuantity(id)}>＋</span>
								</div>

								<div className="price">
									<p>{currency} {price}</p>
								</div>

								<div className="image">
									<img src={image_url} alt={title} />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Cart;
