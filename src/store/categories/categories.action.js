import { CATEGORIES_ACTION_TYPES } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

//export const fetchCategoriesSuccess = (categoriesArray) =>
// createAction(
// 	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
// 	categoriesArray
// );
export const fetchCategoriesSuccess = (categoriesArray) => {
	console.log("Erfolgreich abgerufene Kategorien:", categoriesArray);
	return createAction(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		categoriesArray
	);
};

export const fetchCategoriesFailure = (error) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchProductsBySubCategoryStart = (category, subcategories) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_SUBCATEGORY_START, {
		category,
		subcategories,
	});

export const fetchProductsBySubCategorySuccess = (products) =>
	createAction(
		CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_SUBCATEGORY_SUCCESS,
		products
	);

export const fetchProductsBySubCategoryFailure = (error) =>
	createAction(
		CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_SUBCATEGORY_FAILED,
		error
	);
//thunk
/* export const fetchCategoriesStartAsync = () => {
	return async (dispatch) => {
		dispatch(fetchCategoriesStart());
		try {
			const categoriesArray = await getCategoriesAndDocuments(
				"categories"
			);
			dispatch(fetchCategoriesSuccess(categoriesArray));
		} catch (error) {
			dispatch(fetchCategoriesFailure(error));
		}
	};
};
 */
