import {Link} from 'react-router-dom'
function Header(props) {
	return (
	<header className="d-flex justify-between align-center p-40">
		<div className="d-flex align-centerl">
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
				<span>6700 тг.</span>
			</li>
			<li className="mr-30">
				<Link to="/react-sneakers/favorites">
					<img width={18} height={18} src="./LoveIcon.svg" alt="LoveIcon"/>
				</Link>
				<span>Закладки </span>
			</li>
			<li>
				<img width={18} height={18} src="./userIcon.png" alt="userIcon"/>
				<span>Профиль </span>
			</li>
		</ul>
	</header>
	);
}

export default Header;