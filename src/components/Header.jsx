function Header() {
	return (
	<header className="d-flex justify-between align-center p-40">
		<div className="d-flex align-centerl">
			<img width={40} height={40} src="./logo.png" alt="logo"/>
			<div>
				<h3 className="text-uppercase">React Sneakers</h3>
				<p className="opacity-5">Магазин лучших кроссовок</p>
			</div>
		</div>
		<ul className="d-flex ">
			<li className="mr-30">
				<img width={18} height={18} src="./cartIcon.svg" alt="cartIcon"/>
				<span>6700 тг.</span>
			</li>
			<li className="mr-30">
				<img width={18} height={18} src="./LoveIcon.svg" alt="LoveIcon"/>
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