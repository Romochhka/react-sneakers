function Card() {
	return <div className="card">
		<img width={133} height={112} src="./sneakers/4.jpg" alt="Sneakers"/>
		<h5>Мужские Кроссовки Nike Air Max 270</h5>
		<div className="d-flex justify-between align-center">
			<div className="d-flex flex-column">
				<span>Цена:</span>
				<b>69 990 тг.</b>
			</div>
			<button className="button">
				<img width={11} height={11} src="./plus.svg" alt="Plus"/>
			</button>
		</div>
	</div>
}

export default Card;