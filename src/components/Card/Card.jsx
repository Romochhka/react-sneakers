import React from 'react';
import styles from './Card.module.scss';
import axios from "axios";

function Card({ onFavorite, title, imageUrl, price, onPlus }) {
	const [isAdded, setIsAdded] = React.useState(false);
	const [isFavorite, setIsFavorite] = React.useState(false);

	const onClickPlus = () => {
		onPlus({title, price, imageUrl});
		setIsAdded(!isAdded);
	};

	const onClickFavorite = () => {
		onFavorite({});
		setIsFavorite(!isFavorite);}

	return (
		<div className={styles.card}>
			<div className={styles.favorite} onClick={onFavorite}>
				<img onClick={onClickFavorite} src={isFavorite ? "./liked.svg" : "./notLiked.svg"} alt="NotLiked"/>
			</div>
			<img width={133} height={112} src={imageUrl} alt="Sneakers"/>
			<h5>{title}</h5>
			<div className="d-flex justify-between align-center">
				<div className="d-flex flex-column">
					<span>Цена:</span>
					<b>{price} тг</b>
				</div>
					<img className={styles.plus} onClick={onClickPlus} src={isAdded ? "./btn-checked.svg" : "./plus.svg" } alt="Plus"/>
			</div>
		</div>
	)
}

export default Card;