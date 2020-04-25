import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import url from '../utils/url';

const Search = ({ setData }) => {
	const [ searchInput, setSearchInput ] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await axios.get(`${url}/offer/with-count?title=${searchInput}`);

		setData(response.data.offers);
	};

	return (
		<div className="firstContainer">
			<div className="searchTop">
				<form onSubmit={handleSubmit}>
					<div className="searchBar">
						<FontAwesomeIcon icon="search" size="1x" />
						<input
							type="text"
							name="search"
							placeholder="Que recherchez-vous?"
							onChange={(e) => setSearchInput(e.target.value)}
						/>
					</div>
					<button type="submit">Rechercher</button>
				</form>
			</div>
		</div>
	);
};
export default Search;
