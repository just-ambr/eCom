import { takeLatest, all, call, put } from "redux-saga/effects";

import {
	fetchCategoriesSuccess,
	fetchCategoriesFailure,
} from "./images.action";

import { IMAGES_ACTION_TYPES } from "./images.types";

import { fetchImagesSuccess, fetchImagesFailure } from "./images.action";

// ... andere imports

export function* fetchImagesAsync() {
	try {
		// Code zum Abrufen der Bilder von Unsplash und Aktualisieren in Firestore
		const imageUrls = yield call(updateImagesInFirestore);
		yield put(fetchImagesSuccess(imageUrls));
	} catch (error) {
		yield put(fetchImagesFailure(error));
	}
}

export function* onFetchImagesStart() {
	yield takeLatest("category/FETCH_IMAGES_START", fetchImagesAsync);
}

// Füge diese Funktion in deine categoriesSaga ein
export function* categoriesSaga() {
	yield all([call(onFetchCategories), call(onFetchImagesStart)]);
}
