import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
	categories: [],
	isLoading: false,
	error: null,
	filteredProducts: [],
};

export const categoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return {
				...state,
				isLoading: true,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				isLoading: false,
				categories: payload,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_SUBCATEGORY_SUCCESS:
			console.log("Filtered products stored in state:", payload);
			return {
				...state,
				isLoading: false,
				filteredProducts: payload,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_SUBCATEGORY_FAILED:
			return {
				...state,
				isLoading: false,
				error: payload,
			};
		default:
			return state;
	}
};
