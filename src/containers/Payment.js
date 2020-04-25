import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { useLocation, Redirect } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

function Payment({ name, tokenUser }) {
	//from the cookie :
	const token = tokenUser;
	const username = name;

	const location = useLocation();
	// const offer = location.state.offer;

	let { img, title, price, productId } = location.state;

	return tokenUser ? (
		<div className="containerPayment">
			{/* public API key */}
			<StripeProvider apiKey="pk_test_4pXlekeUdu7xF1UDMLRKkD78009gmPbaMU">
				<div className="cardPayment">
					<h2>Acheter en ligne</h2>
					<div>
						<img src={img} alt={title} />
						<div>
							<h3>{title}</h3>
							<span className="pricePayment">{price} €</span>
						</div>
					</div>

					<Elements>
						<CheckoutForm
							username={username}
							price={price}
							title={title}
							productId={productId}
							token={token}
						/>
					</Elements>
				</div>
			</StripeProvider>
		</div>
	) : (
		<Redirect to="/login" />
	);
}

export default Payment;
