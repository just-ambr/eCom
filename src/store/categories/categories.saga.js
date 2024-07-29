import { takeLatest, all, call, put } from "redux-saga/effects";

import {
	getCategoriesAndDocuments,
	getProductsByCategoryAndSubCategory,
	getProductsByCategoryAndSubCategories,
} from "../../utils/firebase/firebase.utils";

import {
	fetchCategoriesSuccess,
	fetchCategoriesFailure,
	fetchProductsBySubCategorySuccess,
	fetchProductsBySubCategoryFailure,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

//generator
export function* fetchCategoriesStartAsync() {
	try {
		const categoriesArray = yield call(getCategoriesAndDocuments);
		yield put(fetchCategoriesSuccess(categoriesArray));
	} catch (error) {
		yield put(fetchCategoriesFailure(error));
	}
}

export function* onFetchCategories() {
	yield takeLatest(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesStartAsync
	);
}
// Generator function for fetching products by subcategory
export function* fetchProductsBySubCategoryAsync({
	payload: { category, subcategories },
}) {
	try {
		const products = yield call(
			getProductsByCategoryAndSubCategories,
			category,
			subcategories
		);
		console.log(
			"Products fetched from Firestore by subcategory:",
			products
		);
		yield put(fetchProductsBySubCategorySuccess(products));
	} catch (error) {
		yield put(fetchProductsBySubCategoryFailure(error));
	}
}

export function* onFetchProductsBySubCategory() {
	yield takeLatest(
		CATEGORIES_ACTION_TYPES.FETCH_PRODUCTS_BY_SUBCATEGORY_START,
		fetchProductsBySubCategoryAsync
	);
}

export function* categoriesSaga() {
	yield all([call(onFetchCategories), call(onFetchProductsBySubCategory)]);
}
