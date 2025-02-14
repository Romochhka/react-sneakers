import React from 'react';
import Card from './components/Card/Card.jsx';
import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [cartOpened, setCartOpened] = React.useState(false);

	React.useEffect(() => {
		fetch('https://67add5003f5a4e1477df47df.mockapi.io/items').then(res => {
			return res.json();
		}).then(json => {
			setItems(json);
		})
	}, []);

	const onAddToCart = (obj) => {
		setCartItems(prev => {
			const isItemInCart = prev.some((item) => item.title === obj.title);
			// [...prev, obj]);
			return isItemInCart ? prev : [...prev, obj];
		});
	};



	return (
		<div className="wrapper clear">
			{cartOpened && <CartDrawer items={cartItems} onClose={() => setCartOpened(false)}/>}
			<Header onClickCart={() => setCartOpened(!cartOpened)} />
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>Все кроссовки</h1>
					<div className="search-block d-flex">
						<img src="./search.svg" alt="search"/>
						<input placeholder="Поиск..."/>
					</div>
				</div>
				<div className="d-flex flex-wrap">
					{items.map((item) => (
						<Card
							  title={item.title}
							  price={item.price}
							  imageUrl={item.imageUrl}
							  onFavorite={() => console.log("Добавили в закладки")}
							  onPlus={(obj) => onAddToCart(obj)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
