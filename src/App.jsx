import React from 'react';
import Card from './components/Card/Card.jsx';
import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

const arr = [{
	title: 'Мужские Кроссовки Nike Blazer Mid Suede',
	price: '57990',
	imageUrl: "./sneakers/1.png"
},
	{
		title: 'Мужские Кроссовки Nike Air Max 270',
		price: '45990',
		imageUrl: "./sneakers/2.jpg"
	},
	{
		title: 'Мужские Кроссовки Nike Blazer Mid Suede',
		price: '47990',
		imageUrl: "./sneakers/3.jpg"
	},
	{
		title: 'Кроссовки Puma X Aka Boku Future Rider',
		price: '69990',
		imageUrl: "./sneakers/4.jpg"
	}];

function App() {
	return (
		<div className="wrapper clear">
			<CartDrawer/>
			<Header/>
			<div className="content p-40">
				<div className="d-flex align-center justify-between mb-40">
					<h1>Все кроссовки</h1>
					<div className="search-block d-flex">
						<img src="./search.svg" alt="search"/>
						<input placeholder="Поиск..."/>
					</div>
				</div>
				<div className="d-flex">
					{arr.map((obj, index) => (
						<Card key={index}
							  title={obj.title}
							  price={obj.price}
							  imageUrl={obj.imageUrl}
							  onFavorite={() => console.log("Добавили в закладки")}
							  onPlus={() => console.log("Нажали плюс")}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
