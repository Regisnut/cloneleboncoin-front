import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import url from '../utils/url';

function Publish({ tokenUser }) {
	const [ title, setTitle ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ price, setPrice ] = useState('');

	let history = useHistory();

	let arrayPictures = [];

	const handleChangeFiles = (event) => {
		for (let i = 0; i < event.target.files.length; i++) {
			arrayPictures.push(event.target.files[i]);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		let formData = new FormData();

		formData.append('title', title);
		formData.append('description', description);
		formData.append('price', price);

		for (let i = 0; i < arrayPictures.length; i++) {
			formData.append('files', arrayPictures[i]);
		}

		try {
			const token = tokenUser;
			console.log('tokenUser pour publish', tokenUser);
			console.log('token pour publish', token);
			if (title && description && price) {
				console.log('offer 1');
				const response = await axios.post(`${url}/offer/publish`, formData, {
					headers: {
						authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data'
					}
				});
				console.log('response', response);
				history.push('/offer/' + response.data._id);
			} else {
				alert('Merci de remplir les champs demandés !!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return tokenUser ? (
		<div className="containerPublish">
			<main>
				<h2>Déposer une annonce</h2>
				<form onSubmit={handleSubmit}>
					<label>
						Titre de l'annonce<sup>*</sup>
					</label>
					<input
						name="title"
						type="text"
						value={title}
						onChange={(event) => {
							setTitle(event.target.value);
						}}
					/>
					<label>
						Texte de l'annonce<sup>*</sup>
					</label>
					<textarea
						name="description"
						type="text"
						// row="20"
						value={description}
						onChange={(event) => {
							setDescription(event.target.value);
						}}
					/>
					<label>
						Prix<sup>*</sup>
					</label>
					<div className="priceContainer">
						<input
							className="priceInput"
							name="price"
							type="number"
							value={price}
							onChange={(event) => {
								setPrice(event.target.value);
							}}
						/>
						<strong>€</strong>
					</div>
					<label>
						Photos<sup>*</sup>
					</label>
					<input className="fileInput" name="picture" type="file" multiple onChange={handleChangeFiles} />
					<button type="submit">Publier</button>
				</form>
			</main>
		</div>
	) : (
		<Redirect to="/login" />
	);
}

export default Publish;
