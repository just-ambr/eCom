import { createSelector } from "reselect";

const selectImageReducer = (state) => state.categories;

export const selectCategoriesImagesLoading = createSelector(
	[selectImageReducer],
	(categoriesSlice) => categoriesSlice.imagesLoading
);

export const selectCategoriesImagesError = createSelector(
	[selectImageReducer],
	(categoriesSlice) => categoriesSlice.imagesError
);

// Füge weitere Selectors hinzu, falls du zum Beispiel Zugriff auf die aktualisierten Bild-URLs benötigst
