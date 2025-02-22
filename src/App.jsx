import React from 'react';
import {Route, Routes} from 'react-router-dom'
import axios from 'axios';
import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";


function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setfavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cartOpened, setCartOpened] = React.useState(false);

	React.useEffect(() => {
		axios.get('https://react-sneakers-1f8db-default-rtdb.asia-southeast1.firebasedatabase.app/items/.json').then(res => {
			setItems(res.data);
		})
		axios.get('https://67add5003f5a4e1477df47df.mockapi.io/cart').then(res => {
			setCartItems(res.data);
		})
		axios.get('https://67add5003f5a4e1477df47df.mockapi.io/favorites').then(res => {
			setfavorites(res.data);
		})

	}, []);


	//функции -->
	const onAddToCart = async (obj) => {
		try {
			const {data} = await axios.post('https://67add5003f5a4e1477df47df.mockapi.io/cart', obj);

			setCartItems((prev) => {
				const isItemInCart = prev.some((item) => item.id === obj.id);
				if (isItemInCart) {
					return prev.filter((item) => item.id !== obj.id);
				}
				return [...prev, data];
			});
		} catch (error) {
			console.error('Ошибка при добавлении в корзину:', error);
		}
	};


	const onRemoveItem = (id) => {
		console.log(id);
		axios.delete(`https://67add5003f5a4e1477df47df.mockapi.io/cart/${id}`);

		setCartItems(prev => prev.filter(item => item.id !== id));
	};

	const onAddToFavorite = async (obj) => {
		if (favorites.find((favobj) => favobj.id === obj.id)) {
			axios.delete(`https://67add5003f5a4e1477df47df.mockapi.io/favorites/${obj.id}`);
			setfavorites((prev) => prev.filter((item) => item.id !== obj.id));
		} else {
			const {data} = await axios.post('https://67add5003f5a4e1477df47df.mockapi.io/favorites', obj)
			setfavorites((prev) => [...prev, data]);
		}
	};

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
			<Header onClickCart={() => setCartOpened(!cartOpened)}/>
			{cartOpened && <CartDrawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
			<Routes>


				<Route
					path="/react-sneakers"
					element={
						<Home
							items={items}
							searchValue={searchValue}
							setSearchValue={setSearchValue}
							onChangeSearchInput={onChangeSearchInput}
							onAddToFavorite={onAddToFavorite}
							onAddToCart={onAddToCart}
							onClearSearch={onClearSearch}
							upperCaseSearch={upperCaseSearch}
						/>
					}
					exact
				/>
				<Route
					path="/react-sneakers/favorites"
					element={
						<Favorites items={favorites} onAddToFavorite={onAddToFavorite}/>
					}
					exact
				/>
			</Routes>


		</div>

	);

}

export default App;
