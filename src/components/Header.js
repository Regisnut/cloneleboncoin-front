import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../assets/leboncoin.png';
import DrawerToggleButton from '../utils/drawerToggleButton';

function Header({ setToggle, name, setName, tokenUser, setTokenUser }) {
	let history = useHistory();

	return (
		<div>
			<header>
				<i
				// onClick={() => {
				// 	setToggle((preValue) => !preValue);
				// }}
				>
					<DrawerToggleButton setToggle={setToggle} />
				</i>
				<Link to="/">
					<img src={logo} alt="logo-leboncoin" />
				</Link>

				<nav>
					<section>
						<Link to="/publish">
							<h3>
								<FontAwesomeIcon className="pHeader" icon="plus-square" />
								<div>Déposer une annonce</div>
							</h3>
						</Link>

						<h3>
							<FontAwesomeIcon icon="search" />
							<div>Rechercher</div>
						</h3>

						<div className="flex">
							{tokenUser === null ? (
								<Link to="/login">
									<h3>
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
									}}
								>
									<FontAwesomeIcon icon="sign-in-alt" />
									<div>Se déconnecter</div>
								</h3>
							)}

							<div className="boxName">
								<FontAwesomeIcon icon="user-alt" />
								<div className="name">{name ? name.toUpperCase() : null}</div>
							</div>
						</div>
					</section>
				</nav>
			</header>
		</div>
	);
}

export default Header;
