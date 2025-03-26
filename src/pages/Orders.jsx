import React from "react";
import Card from "../components/Card/Card.jsx";
import axios from "axios";
import AppContext from "../components/context.jsx";


function Orders() {
	const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
	const [orders, setOrders] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);




	React.useEffect(() => {
		(async() => {
			try {
				const { data } = await axios.get('https://react-sneakers-1f8db-default-rtdb.asia-southeast1.firebasedatabase.app/orders/.json');
				const ordersArray = Object.values(data).flatMap(order => order.items || []);
				setOrders(ordersArray);
				setIsLoading(false);
			} catch (error) {
				alert("Ошибка заказа");
				console.error(error)
			}
		})();
	}, []);


	return  (
		<div className="content p-40">
			<div className="d-flex align-center justify-between mb-40">
				<h1>Мои заказы</h1>
			</div>
			<div className="d-flex flex-wrap">
				{(isLoading ? [...Array(8)] : orders).map((item, index) => (
					<Card key={index}
						  loading={isLoading}
						  {...item} />

				))}
			</div>
		</div>
	)
}

export default Orders;