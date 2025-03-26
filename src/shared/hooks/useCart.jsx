import React from 'react';
import AppContext from "../../components/context.jsx";

export const useCart = () => {
	const {cartItems, setCartItems } = React.useContext(AppContext);
	const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
	const tax = (totalPrice * 0.05).toFixed(2);
	return { cartItems, setCartItems, totalPrice, tax};

}