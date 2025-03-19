import React from 'react';
import AppContext from "../components/context.jsx";
import '../index.scss'

const info = ({ title, image, description }) => {
	const { setCartOpened } = React.useContext(AppContext);
	return (
		<div>
			<div className="cartEmpty d-flex align-center justify-center flex-column flex">
				<img className="mb-20" width="120px"  src={image} alt="CartEmpty"/>
				<h2>{title}</h2>
				<p className="opacity-6">{description}</p>
				<button onClick={() => setCartOpened(false)} className="greenButton">
					<img src="./arrow.svg" alt="arrow"/>
					Вернуться назад

				</button>
			</div>
		</div>
	)
}
export default info;