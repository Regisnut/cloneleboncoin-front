import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import url from '../utils/url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignUp({ setTokenUser, setName }) {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordConfirm, setPasswordConfirm ] = useState('');
	const [ toggle, setToggle ] = useState(false);

	let history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (username && email && password && passwordConfirm) {
			if (password !== passwordConfirm) {
				alert('Password are not matching ! Please retry');
			} else {
				await axios
					.post(`${url}/signup`, {
						username,
						email,
						password
					})
					.then(function(response) {
						const token = response.data.token;
						if (response.data.message === 'Email already exist') {
							alert('This email is already in use');
						} else if (response.data.message === 'Missing information') {
							alert('Please fill all the information');
						} else {
							alert(`Merci pour votre inscription ${username}`);
							Cookies.set('token', token, { expires: 7 });
							Cookies.set('username', username, { expires: 7 });
							setName(username);
							setTokenUser(token);
							history.push('/');
						}
					})
					.catch(function(error) {
						console.log(error);
						alert('An error occurred');
					});
			}
		} else {
			alert('Please fill all required field');
		}
	};
	return (
		<div className="containerSignup">
			<section className="leftSign">
				<h2>Pourquoi créer un compte</h2>
				<br />
				<div>
					<div>
						<h3>
							<FontAwesomeIcon className="icon" icon="clock" /> Gagnez du temps
						</h3>
						<p>
							Gagnez du temps. Publiez vos annonces rapidement, avec vos informations pré-remplies chaque
							fois que vous souhaitez déposer une nouvelle annonce.
						</p>
					</div>
				</div>
				<div>
					<div>
						<h3>
							<FontAwesomeIcon className="icon" icon="bell" /> Soyez les premiers informés
						</h3>
						<p>
							Soyez les premiers informés. Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
							qui vous intéresse.
						</p>
					</div>
				</div>
				<div>
					<div>
						<h3>
							<FontAwesomeIcon className="icon" icon="eye" /> Visibilité
						</h3>
						<p>
							Visibilité Suivez les statistiques de vos annonces (nombre de fois où votre annonce a été
							vue, nombre de contacts reçus).
						</p>
					</div>
				</div>
			</section>
			<section className="rightSign">
				<h2>Créer un compte</h2>
				<br />
				<hr />
				<form onSubmit={handleSubmit}>
					<label>Pseudo *</label>
					<input
						name="username"
						type="text"
						value={username}
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>

					<label>Adresse email *</label>
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
							<FontAwesomeIcon className="icon" icon={toggle === true ? 'eye' : 'eye-slash'} />
						</span>
					</div>
					<label>Confirmation Mot de Passe</label>
					<div>
						<input
							name="passwordConfirm"
							type={toggle ? 'text' : 'password'}
							value={passwordConfirm}
							onChange={(event) => {
								setPasswordConfirm(event.target.value);
							}}
						/>
						<span
							onClick={() => {
								setToggle((preValue) => !preValue);
							}}
						>
							<FontAwesomeIcon className="icon" icon={toggle === true ? 'eye' : 'eye-slash'} />
						</span>
					</div>
					<div>
						<input className="checkbox" type="checkbox" />
						"J'accepte les Conditions Générales de Vente et les Conditions Générales d'Utilisation"
					</div>
					<br />
					<button type="submit">Créer mon compte Personnel</button>
				</form>
			</section>
		</div>
	);
}

export default SignUp;
