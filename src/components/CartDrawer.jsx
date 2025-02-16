function CartDrawer({onClose, items = []}) {
	return (
		<div className="overlay">
			<div className="rightSide">
				<h2 className="d-flex justify-between mb-30 ">Корзина
				</h2>

			<div className="items">
				{
					items.map((obj, index) => (
						<div key={index} className="cartItem d-flex align-center mb-20">
							<div
								style={{ backgroundImage: `url(${obj.imageUrl})` }}
								className="cartItemImg"
							></div>

							<div className="mr-20 flex">
								<p className="mb-5">{obj.title}</p>
								<b>{obj.price}</b>
							</div>

							<img className="removeBtn" src="./btn-remove.svg" alt="Remove" />
						</div>
					))

				}
			</div>
				<div className="cartTotalBlock">
					<ul>
						<li className="d-flex ">
							<span>Итого:</span>
							<div></div>
							<b>115 980 тг. </b>
						</li>
						<li className="d-flex ">
							<span>Налог 5%:</span>
							<div></div>
							<b>121 779 тг.</b>
						</li>
					</ul>
					<button className="greenButton">Оформить заказ<img src="./arrow.svg" alt="Arrow"/></button>
				</div>
			</div>
		</div>
	);
}

export default CartDrawer;