import React from 'react';
import axios from 'axios';
import Card from './components/Card/Card.jsx';
import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";


function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [Favorites, setFavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cartOpened, setCartOpened] = React.useState(false);

	React.useEffect(() => {
		axios.get('https://react-sneakers-1f8db-default-rtdb.asia-southeast1.firebasedatabase.app/items/.json').then(res => {
			setItems(res.data);
		})
		axios.get('https://67add5003f5a4e1477df47df.mockapi.io/cart').then(res => {
			setCartItems(res.data);
		})

	}, []);


	//функции -->
	const onAddToCart = (obj) => {
		axios.post('https://67add5003f5a4e1477df47df.mockapi.io/cart', obj)
		setCartItems(prev => {
			const isItemInCart = prev.some((item) => item.title === obj.title);
			if (isItemInCart) {
				return prev.filter(item => {
					return item.title !== obj.title
				});
			}
			return [...prev, obj];
		});
	};

	const onRemoveItem = (id) => {
		console.log(id);
		axios.delete(`https://67add5003f5a4e1477df47df.mockapi.io/cart/${id}`);

		setCartItems(prev => prev.filter(item => item.id !== id));
	};

	const onAddToFavorite = (obj) => {
		axios.post('https://67add5003f5a4e1477df47df.mockapi.io/favorites', obj)
		setFavorites((prev) => [...prev, obj]);
	}

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};
	const onClearSearch = () => {
		setSearchValue("");
	}

	const upperCaseSearch = () => {
		return items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
	}
	return (
		<div className="wrapper clear">
			{cartOpened && <CartDrawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
			<Header onClickCart={() => setCartOpened(!cartOpened)}/>
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
					<div className="search-block d-flex">
						<img src="./search.svg" alt="search"/>
						{searchValue && <img
							onClick={onClearSearch}
							className="clear cu-p" src="./btn-remove.svg" alt="Clear"
						/>}
						<input
							onChange={onChangeSearchInput}
							value={searchValue}
							maxLength={45}
							placeholder="Поиск..."
						/>
					</div>
				</div>
				<div className="d-flex flex-wrap">
					{upperCaseSearch().map((item, index) => (
						<Card
							key={index}
							title={item.title}
							price={item.price}
							imageUrl={item.imageUrl}
							onFavorite={(obj) => (onAddToFavorite(obj))}
							onPlus={(obj) => onAddToCart(obj)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
