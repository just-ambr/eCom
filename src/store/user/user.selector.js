import { createSelector } from "reselect";

// vor user-profile.comp gab es nur diese zeile in dieser file
//export const selectCurrentUser = (state) => state.user.currentUser;

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
	[selectUserReducer],
	(user) => user.currentUser
);
