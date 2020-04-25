import React from 'react';
import './cssCustomerLoader.css';

const CustomLoader = ({ classes }) => (
	<div className="lds-container">
		<div className="lds-roller">
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
	</div>
);

export default CustomLoader;
