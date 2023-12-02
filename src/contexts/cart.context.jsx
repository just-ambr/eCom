import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	// if found a matching id, increment quantitiy
	if (existingCartItem) {
		return cartItems.map(
			(cartItem) =>
				cartItem.id === productToAdd.id // is this cart item the same we want to add ?
					? { ...cartItem, quantity: cartItem.quantity + 1 } //creating a new object and spreading all of that old properties of cartItems and add quantity to it
					: cartItem // if not a product related to productToAdd than just return cartItem
		);
	}
	// return new array with modified cartItems/ new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }]; // for new product in the cart and no product exists
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCardItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, currentCartItem) => total + currentCartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addItemToCart = (product) => {
		//whenever we gonna call this method, than it will give us back the array that we want to update for our cartItems
		setCardItems(addCartItem(cartItems, product));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
	};

	return (
		<CartContext.Provider value={value}>{children}</CartContext.Provider>
	);
};

/*
product item
{id, name,price, imageurl}

cart item
{id, name,price, imageurl, quantity}
*/
