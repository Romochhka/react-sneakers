function CartDrawer({onClose, onRemove, items = []}) {

	const totalPrice = items.reduce((total, item) => total + item.price, 0);
	const tax = (totalPrice * 0.05).toFixed(2);

	return (
		<div className="overlay">
			<div className="rightSide">
				<h2 className="d-flex justify-between mb-30">
					Корзина
					<img onClick={onClose} className="cu-p" src="./btn-remove.svg" alt="remove"/>
				</h2>

				{
					items.length > 0 ?
						<div className="items">
							{
								items.map((obj, index) => (
									<div key={index} className="cartItem d-flex align-center mb-20">
										<div
											style={{backgroundImage: `url(${obj.imageUrl})`}}
											className="cartItemImg"
										></div>

										<div className="mr-20 flex">
											<p className="mb-5">{obj.title}</p>
											<b>{obj.price}</b>
										</div>

										<img
											onClick={() => onRemove(obj.id)} className="removeBtn"
											src="./btn-remove.svg"
											alt="Remove"
										/>
									</div>
								))
							}
						</div> :
						<div className="cartEmpty d-flex align-center justify-center flex-column flex">
							<img className="mb-20" width="120px" height="120px" src="./cartEmpty.svg" alt="CartEmpty"/>
							<h2>Корзина пустая</h2>
							<p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ</p>
							<button onClick={onClose} className="greenButton">
								<img src="./arrow.svg" alt="arrow"/>
								Вернуться назад

							</button>
						</div>
				}

				{items.length > 0 && (
					<div className="cartTotalBlock">
						<ul>
							<li className="d-flex">
								<span>Итого:</span>
								<div></div>
								<b>{totalPrice} тг. </b>
							</li>
							<li className="d-flex">
								<span>Налог 5%:</span>
								<div></div>
								<b>{tax} тг.</b>
							</li>
						</ul>
						<button className="greenButton">Оформить заказ<img src="./arrow.svg" alt="Arrow"/></button>
					</div>
				)}

			</div>
		</div>
	);
}

export default CartDrawer;
