import Card from "../components/Card/Card.jsx";
import React from "react";

function Home({
				  searchValue,
				  onChangeSearchInput,
				  onAddToFavorite,
				  onAddToCart,
				  onClearSearch,
				  upperCaseSearch,

			  }) {
	return (
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
						onFavorite={(obj) => onAddToFavorite(obj)}
						onPlus={(obj) => onAddToCart(obj)}
						{...item}

					/>

				))}

			</div>
		</div>
	)
}

export default Home;