import { createAction } from "../../utils/reducer/reducer.utils";

export const fetchImagesStart = () =>
	createAction("category/FETCH_IMAGES_START");

export const fetchImagesSuccess = (imageUrls) =>
	createAction("category/FETCH_IMAGES_SUCCESS", imageUrls);

export const fetchImagesFailure = (error) =>
	createAction("category/FETCH_IMAGES_FAILED", error);
