// Füge die neuen Action-Typen für das Bild-Update hinzu
import { IMAGES_ACTION_TYPES } from "./images.types";

export const IMAGES_INITIAL_STATE = {
	// ... andere States
	imagesLoading: false,
	imagesError: null,
	// Füge, falls nötig, weitere States für die Bilder hinzu
};

export const categoriesReducer = (
	state = IMAGES_INITIAL_STATE,
	action = {}
) => {
	const { type, payload } = action;

	switch (type) {
		// ... andere case handler
		case IMAGES_ACTION_TYPES.FETCH_IMAGES_START:
			return { ...state, imagesLoading: true };
		case IMAGES_ACTION_TYPES.FETCH_IMAGES_SUCCESS:
			// Hier müsstest du entscheiden, wie du die URLs in den State einfügst
			// Beispiel: State mit einer Liste von Kategorie-Objekten
			return {
				...state,
				imagesLoading: false,
				categories: state.categories.map((category) => {
					return {
						...category,
						items: category.items.map((item, index) => {
							return { ...item, imageUrl: payload[index] };
						}),
					};
				}),
			};
		case IMAGES_ACTION_TYPES.FETCH_IMAGES_FAILED:
			return { ...state, imagesLoading: false, imagesError: payload };
		default:
			return state;
	}
};
