import React from 'react';
import '../styles/style.scss';

function Footer() {
	return (
		<footer>
			<div>
				<div>
					Projet clone du site leboncoin made with{' '}
					<span role="img" aria-label="heart">
						♥️
					</span>
					@copyrights {new Date().getFullYear().toString()}
				</div>
			</div>
		</footer>
	);
}

export default Footer;
