import { USER_ACTION_TYPES } from "./user.types";

export const USER_INITIAL_STATE = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: { ...payload, fetched: false },
				isLoading: false,
				error: null,
			};
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return {
				...state,
				currentUser: null,
				isLoading: false,
				error: null,
			};
		case USER_ACTION_TYPES.FETCH_USER_DATA_SUCCESS:
			return {
				...state,
				currentUser: { ...payload, fetched: true },
				isLoading: false,
				error: null,
			};
		case USER_ACTION_TYPES.UPDATE_USER_DATA_SUCCESS:
			return {
				...state,
				currentUser: { ...state.currentUser, ...payload },
				isLoading: false,
				error: null,
			};
		case USER_ACTION_TYPES.SIGN_OUT_FAILED:
		case USER_ACTION_TYPES.SIGN_IN_FAILURE:
		case USER_ACTION_TYPES.SIGN_UP_FAILED:
		case USER_ACTION_TYPES.FETCH_USER_DATA_FAILURE:
		case USER_ACTION_TYPES.UPDATE_USER_DATA_FAILURE:
			return { ...state, error: payload, isLoading: false };
		case USER_ACTION_TYPES.FETCH_USER_DATA_START:
		case USER_ACTION_TYPES.UPDATE_USER_DATA_START:
			return { ...state, isLoading: true };
		default:
			return state;
	}
};
