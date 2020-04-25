import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import url from '../utils/url';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login({ name, setName, tokenUser, setTokenUser }) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ toggle, setToggle ] = useState(false);

	let history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(`${url}/login`, {
				email,
				password
			});
			if (!response.data) {
				alert("cet email/mot de passe n'existe pas");
			} else {
				const token = response.data.token;
				const username = response.data.account.username;
				Cookies.set('token', token, { expires: 7 });
				Cookies.set('username', username, { expires: 7 });

				setName(username.toUpperCase());
				setTokenUser({ token: token });
				history.push('/');
			}
		} catch (error) {
			alert('Les données ne pas valides');
		}
	};

	return (
		<div className="containerLogin">
			<main>
				<h1>Bonjour !</h1>
				<p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>
				<br />
				<form onSubmit={handleSubmit}>
					<label>E-mail</label>
					<input
						name="email"
						type="email"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<label>Mot de Passe</label>
					<div>
						<input
							name="password"
							type={toggle ? 'text' : 'password'}
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<span
							onClick={() => {
								setToggle((preValue) => !preValue);
							}}
						>
							<FontAwesomeIcon icon={toggle === true ? 'eye' : 'eye-slash'} />
						</span>
					</div>
					<div className="forget">Mot de passe oublié</div>
					<button type="submit">Se connecter</button>
				</form>
				<hr />
				<br />
				<h2>Envie de nous rejoindre ?</h2>
				<br />
				<Link to="/signup">
					<button>Créer un compte</button>
				</Link>
			</main>
		</div>
	);
}

export default Login;
