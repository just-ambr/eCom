import { CategoriesItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
	createAction,
	ActionWithPayload,
	withMatcher,
} from "../../utils/reducer/reducer.utils";

const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoriesItem
): CartItem[] => {
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
const removeCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CategoriesItem
): CartItem[] => {
	// find the cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	//check if quantity is equal to 1, if it has remove that item from the cart
	if (existingCartItem && existingCartItem.quantity === 1) {
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
const clearCartItem = (
	cartItems: CartItem[],
	cartItemToClear: CategoriesItem
): CartItem[] =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetCartIsOpen = ActionWithPayload<
	CART_ACTION_TYPES.SET_IS_CART_OPEN,
	boolean
>;

export type SetCartItems = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

//action creators
export const setIsCartOpen = withMatcher((boolean: boolean) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

export const setCartItems = withMatcher((cartItems: CartItem[]) =>
	createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CategoriesItem
) => {
	//whenever we gonna call this method, than it will give us back the array that we want to update for our cartItems
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

//remove item from cart
export const removeItemFromCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	return setCartItems(newCartItems);
};

//clear item from cart
export const clearItemFromCart = (
	cartItems: CartItem[],
	cartItemToClear: CartItem
) => {
	const newCartItems = clearCartItem(cartItems, cartItemToClear);
	return setCartItems(newCartItems);
};
