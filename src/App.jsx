import Card from './components/Card.jsx';
import Header from "./components/Header.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

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
					<div className="card">
						<div className="favorite">
							<img src="./notLiked.svg" alt="notLiked"/>
						</div>
						<img width={133} height={112} src="./sneakers/1.png" alt="Sneakers"/>
						<h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column">
								<span>Цена:</span>
								<b>57 990 тг.</b>
							</div>
							<button className="button">
								<img width={11} height={11} src="./plus.svg" alt="Plus"/>
							</button>
						</div>
					</div>
					<div className="card">
						<img width={133} height={112} src="./sneakers/2.jpg" alt="Sneakers"/>
						<h5>Мужские Кроссовки Nike Air Max 270</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column">
								<span>Цена:</span>
								<b>45 990 тг.</b>
							</div>
							<button className="button">
								<img width={11} height={11} src="./plus.svg" alt="Plus"/>
							</button>
						</div>
					</div>
					<div className="card">
						<img width={133} height={112} src="./sneakers/3.jpg" alt="Sneakers"/>
						<h5>Кроссовки Puma X Aka Boku Future Rider</h5>
						<div className="d-flex justify-between align-center">
							<div className="d-flex flex-column">
								<span>Цена:</span>
								<b>47 990 тг.</b>
							</div>
							<button className="button">
								<img width={11} height={11} src="./plus.svg" alt="Plus"/>
							</button>
						</div>
					</div>
					<Card/>
				</div>
			</div>
		</div>
	);
}

export default App
