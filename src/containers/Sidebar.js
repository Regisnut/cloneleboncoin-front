import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';

function Sidebar({ toggle, setToggle, name, tokenUser, setTokenUser, setName }) {
	let history = useHistory();

	const close = () => {
		setToggle((preValue) => !preValue);
	};
	let drawerClasses = 'sidebarContainer';
	if (toggle) {
		drawerClasses = 'sidebarContainer open';
	}

	return (
		<div className={drawerClasses}>
			<span onClick={close}>
				<strong>X</strong> Close
			</span>
			{/* <Link to="/">
					<img src={logo} alt="logo-leboncoin" />
				</Link> */}
			<section>
				<div className="boxName">
					<FontAwesomeIcon icon="user-alt" />
					<div className="name">{name ? name.toUpperCase() : null}</div>
				</div>
				<Link to="/publish">
					<h3 onClick={close}>
						<FontAwesomeIcon className="pHeader" icon="plus-square" />
						<div>Déposer une annonce</div>
					</h3>
				</Link>
				<Link to="/">
					<h3 onClick={close}>
						<FontAwesomeIcon icon="search" />
						<div>Rechercher</div>
					</h3>
				</Link>

				{tokenUser === null ? (
					<Link to="/login">
						<h3 onClick={close}>
							<FontAwesomeIcon icon="sign-in-alt" />
							<div>Se connecter</div>
						</h3>
					</Link>
				) : (
					<h3
						onClick={() => {
							Cookies.remove('token');
							Cookies.remove('username');
							setTokenUser(null);
							setName('');
							history.push('/');
							close();
						}}
					>
						<FontAwesomeIcon icon="sign-in-alt" />
						<div>Se déconnecter</div>
					</h3>
				)}
			</section>
		</div>
	);
}

export default Sidebar;
