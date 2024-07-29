//import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<div className="cart-item-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="item-details">
				<span>{name}</span>
				<span>
					{quantity} x {price} €
				</span>
			</div>
		</div>
	);
};

export default CartItem;

/*
import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
	const { imageUrl, price, name, quantity } = cartItem;

	return (
		<div className="cart-item-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="item-details">
				<span className="name">{name}</span>
				<span className="price">
					{quantity} x ${price}
				</span>
			</div>
		</div>
	);
};

export default CartItem; */
