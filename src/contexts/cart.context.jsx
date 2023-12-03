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

//TODO remove cart item !!
const removeCartItem = (cartItems, cartItemToRemove) => {
	// find the cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	//check if quantity is equal to 1, if it has remove that item from the cart
	if (existingCartItem.quantity === 1) {
		return cartItems.filter(
			(cartItem) => cartItem.id !== cartItemToRemove.id
		); //TODO diese Zeile muss erklärt werden
	}
	// return back cartitems with matching cart item with reduced quantity
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

// clear cart item
const clearCartItem = (cartItems, cartItemToClear) =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
	isCartOpen: false,
	setIsOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCardItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, currentCartItem) => total + currentCartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	//TODO have look at this again while he is explaining in the video
	useEffect(() => {
		//newCartTotal
		// counting for Total: product.id(oder cartItem.id) quantity * price = total
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		//whenever we gonna call this method, than it will give us back the array that we want to update for our cartItems
		setCardItems(addCartItem(cartItems, productToAdd));
	};

	//remove item from cart
	const removeItemFromCart = (productToRemove) => {
		setCardItems(removeCartItem(cartItems, productToRemove));
	};

	//clear item from cart
	const clearItemFromCart = (cartItemToClear) => {
		setCardItems(clearCartItem(cartItems, cartItemToClear));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		//remove item from cart
		removeItemFromCart,
		//clear item from cart
		clearItemFromCart,
		cartItems,
		cartCount,
		cartTotal,
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
