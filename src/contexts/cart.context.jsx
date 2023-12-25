import { createContext, useState, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

const CART_ACTION_TYPES = {
	SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
	SET_CART_ITEMS: "SET_CART_ITEMS",
	SET_CART_COUNT: "SET_CART_COUNT",
	SET_CART_TOTAL: "SET_CART_TOTAL",
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload,
			};
		default:
			throw new Error(`Unhandled type ${type} in cartReducer !!`);
	}
};

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
	//	const [cartItems, setCardItems] = useState([]);
	//	const [cartCount, setCartCount] = useState(0);
	//	const [cartTotal, setCartTotal] = useState(0);
	const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
		cartReducer,
		INITIAL_STATE
	);

	const updateCartItemsReducer = (cartItems) => {
		const newCartCount = cartItems.reduce(
			(total, currentCartItem) => total + currentCartItem.quantity,
			0
		);

		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		const payload = {
			cartItems,
			cartCount: newCartCount,
			cartTotal: newCartTotal,
		};

		dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
	};

	/* 	two useEffects changed to reducer
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
	}, [cartItems]); */

	const addItemToCart = (productToAdd) => {
		//whenever we gonna call this method, than it will give us back the array that we want to update for our cartItems
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	//remove item from cart
	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
		//setCardItems(removeCartItem(cartItems, productToRemove));
	};

	//clear item from cart
	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearCartItem(cartItems, cartItemToClear);
		updateCartItemsReducer(newCartItems);
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
