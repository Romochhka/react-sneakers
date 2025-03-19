import React, {useState, useContext} from 'react';
import Info from '../shared/Info.jsx';
import AppContext from "../components/context.jsx";
import axios from 'axios';

function CartDrawer({onClose, onRemove, items = []}) {
	const {cartItems, setCartItems} = useContext(AppContext);
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [orderId, setOrderId] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const ordersResponse = await axios.get(
				"https://react-sneakers-1f8db-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json"
			);

			const orders = ordersResponse.data || {};
			const nextOrderId = Object.keys(orders).length + 1;

			const {data} = await axios.post(
				"https://react-sneakers-1f8db-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
				{id: nextOrderId, items: cartItems}
			);
			setOrderId(nextOrderId);
			setIsOrderComplete(true);
			setCartItems([]);

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete("https://67add5003f5a4e1477df47df.mockapi.io/cart/" + item.id);
				await delay(1000);
			}

		} catch (error) {
			alert("Не удалось создать заказ :(");
			console.error("Ошибка при оформлении заказа:", error);
		}
		setIsLoading(false);
	};

	const totalPrice = items.reduce((total, item) => total + item.price, 0);
	const tax = (totalPrice * 0.05).toFixed(2);

	return (
		<div className="overlay">
			<div className="rightSide">
				<h2 className="d-flex justify-between mb-30">
					Корзина
					<img onClick={onClose} className="cu-p" src="./btn-remove.svg" alt="remove"/>
				</h2>

				{items.length > 0 ? (
					<div className="d-flex flex-column flex">
						<div className="items">
							{items.map((obj) => (
								<div key={obj.id} className="cartItem d-flex align-center mb-20">
									<div
										style={{backgroundImage: `url(${obj.imageUrl})`}}
										className="cartItemImg"
									></div>

									<div className="mr-20 flex">
										<p className="mb-5">{obj.title}</p>
										<b>{obj.price} тг.</b>
									</div>

									<img
										onClick={() => onRemove(obj.id)}
										className="removeBtn"
										src="./btn-remove.svg"
										alt="Remove"
									/>
								</div>
							))}
						</div>

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
							<button disabled={isLoading} onClick={onClickOrder} className="greenButton">
								Оформить заказ
								<img src="./arrow.svg" alt="Arrow"/>
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
						description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской службе!` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
						image={isOrderComplete ? "./order-completed.svg" : "./cartEmpty.svg"}
					/>
				)}
			</div>
		</div>
	);
}

export default CartDrawer;
	