import React from 'react';
import {Route, Routes} from 'react-router-dom'
import axios from 'axios';
import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import AppContext from "./components/context.jsx";

function App() {
	const [items, setItems] = React.useState([]);
	const [cartItems, setCartItems] = React.useState([]);
	const [favorites, setfavorites] = React.useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [cartOpened,  setCartOpened] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		async function fetchData() {
			const cartResponse = await	axios.get('https://67add5003f5a4e1477df47df.mockapi.io/cart');
			const favoritesResponse = await axios.get('https://67add5003f5a4e1477df47df.mockapi.io/favorites');
			const itemsResponse = await axios.get('https://react-sneakers-1f8db-default-rtdb.asia-southeast1.firebasedatabase.app/items/.json');

			setIsLoading(false)

			setCartItems(cartResponse.data);
			setfavorites(favoritesResponse.data);
			setItems(itemsResponse.data);


		}

		fetchData();
	}, []);


	//функции -->
	const onAddToCart = async (obj) => {
		try {
			const isItemInCart = cartItems.find((item) => Number(item.parentId) === Number(obj.id));

			if (isItemInCart) {
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
				await axios.delete(`https://67add5003f5a4e1477df47df.mockapi.io/cart/${isItemInCart.id}`);
			} else {
				const { data } = await axios.post('https://67add5003f5a4e1477df47df.mockapi.io/cart', obj);

				setCartItems((prev) => [...prev, { ...data, parentId: obj.id }]);
			}
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

	const isItemAdded = (id) => {
		console.log("Проверка галочки для id:", id);
		console.log("cartItems:", cartItems);

		return cartItems.some((obj) => Number(obj.parentId) === Number(id));
		// return cartItems.some(item => item.id === id);

	};

	return (
		<AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
			<div className="wrapper clear">
				<Header onClickCart={() => setCartOpened(!cartOpened)}/>
				{cartOpened &&
					<CartDrawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}
				<Routes>


					<Route
						path="/react-sneakers"
						element={
							<Home
								items={items}
								cartItems={cartItems}
								searchValue={searchValue}
								setSearchValue={setSearchValue}
								onChangeSearchInput={onChangeSearchInput}
								onAddToFavorite={onAddToFavorite}
								onAddToCart={onAddToCart}
								onClearSearch={onClearSearch}
								upperCaseSearch={upperCaseSearch}
								isLoading={isLoading}
							/>
						}
						exact
					/>
					<Route
						path="/react-sneakers/favorites"
						element={
							<Favorites />
						}
						exact
					/>
				</Routes>


			</div>
		</AppContext.Provider>

	);

}

export default App;
