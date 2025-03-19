import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';
import AppContext from "../context.jsx";

function Card({ onFavorite, id, title, imageUrl, price, onPlus, favorited=false, loading = false }) {

	const {isItemAdded} = React.useContext(AppContext);
	const [isFavorite, setIsFavorite] = React.useState(favorited);


	const onClickPlus = () => {
		console.log('добавление в корзину:', id, title);
		onPlus({id, title, price, imageUrl});
	};

	const onClickFavorite = () => {
		onFavorite({id, title, price, imageUrl});
		setIsFavorite(!isFavorite);
	}

	return (
		<div className={styles.card}>
			{
				loading ? <ContentLoader
					speed={2}
					width={210}
					height={260}
					viewBox="0 0 210 260"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="426" y="154" rx="10" ry="10" width="150" height="90" />
					<rect x="0" y="0" rx="11" ry="11" width="150" height="91" />
					<rect x="0" y="116" rx="11" ry="11" width="150" height="15" />
					<rect x="0" y="137" rx="4" ry="4" width="93" height="15" />
					<rect x="0" y="176" rx="8" ry="8" width="80" height="24" />
					<rect x="115" y="169" rx="8" ry="8" width="32" height="32" />
				</ContentLoader> : <>
					<div className={styles.favorite}>
						<img
							onClick={onClickFavorite} src={isFavorite ? "./liked.svg" : "./notLiked.svg"} alt="NotLiked"
						/>
					</div>
					<img width={133} height={112} src={imageUrl} alt="Sneakers"/>
					<h5>{title}</h5>
					<div className="d-flex justify-between align-center">
						<div className="d-flex flex-column">
							<span>Цена:</span>
							<b>{price} тг</b>
						</div>
						<img
							className={styles.plus} onClick={onClickPlus}
							src={isItemAdded(id) ? "./btn-checked.svg" : "./plus.svg"}
							alt="Plus"
						/>
					</div>

				</>
			}

		</div>
	)
}

export default Card;