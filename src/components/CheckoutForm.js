import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import url from '../utils/url';
import { Link } from 'react-router-dom';
import success from '../assets/success.png';

const CheckoutForm = ({ stripe, title, price, productId, username, token }) => {
	const [ complete, setComplete ] = useState(false);

	// const CARD_ELEMENT_OPTIONS = {
	// 	style: {
	// 		base: {
	// 			color: '#32325d',
	// 			fontSmoothing: 'antialiased',
	// 			fontSize: '18px',
	// 			'::placeholder': {
	// 				color: '#aab7c4'
	// 			}
	// 		},
	// 		invalid: {
	// 			color: '#fa755a',
	// 			iconColor: '#fa755a'
	// 		}
	// 	}
	// };

	const submit = async (event) => {
		event.preventDefault();
		try {
			// User clicked submit
			// on envoie le numéro de carte à Stripe
			const response = await stripe.createToken({ name: username });
			//Stripe nous envoie un stripeToken qu'on renvoie au back

			const chargeRes = await axios.post(`${url}/payment`, {
				stripeToken: response.token.id,
				amount: price * 100,
				title: title,
				productId: productId,
				token: token
			});

			if (chargeRes.status === 200) {
				setComplete(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (complete) {
		//paiement effectué
		return (
			<div className="payment-confirmed">
				<h3>Merci pour votre paiement</h3>
				<img alt="success" src={success} />
				<div>
					<Link to="/">
						<button>Retour à la page d'accueil</button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="stripe">
			<p>Vos coordonnées bancaires</p>
			{/* On affiche le formulaire de carte bleue */}
			<div>
				<CardElement
				// options={CARD_ELEMENT_OPTIONS}
				/>
			</div>

			<button onClick={submit}>Procéder au paiment</button>
		</div>
	);
};

export default injectStripe(CheckoutForm);
