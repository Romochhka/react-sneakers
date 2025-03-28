import React from 'react';
import {Link} from 'react-router-dom'
import {useCart} from '../shared/hooks/useCart.jsx';

function Header(props) {
	const { totalPrice  } = useCart();

	return (
		<header className="d-flex justify-between align-center p-40">
			<div className="d-flex align-center">
				<Link to="/react-sneakers/">
					<img width={40} height={40} src="./logo.png" alt="logo"/>
					<div>
						<h3 className="text-uppercase">React Sneakers</h3>
						<p className="opacity-5">Магазин лучших кроссовок</p>
					</div>
				</Link>
			</div>

			<ul className="d-flex ">
				<li className="mr-30 cu-p" onClick={props.onClickCart}>
					<img width={18} height={18} src="./cartIcon.svg" alt="cartIcon"/>
					<span>{totalPrice} тг.</span>
				</li>
				<li className="mr-30">
					<Link to="/react-sneakers/favorites">
						<img  width={18} height={18} src="./LoveIcon.svg" alt="LoveIcon"/>
						<span>Закладки </span>
					</Link>

				</li>
				<li>
					<Link to="/react-sneakers/orders">
					<img width={18} height={18} src="./userIcon.png" alt="userIcon"/>
					<span>Профиль </span>
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;