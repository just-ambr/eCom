import { AnyAction } from "redux";

import {
	signInSuccess,
	signOutSuccess,
	signInFailure,
	signUpFailed,
	signOutFailed,
} from "./user.action";

import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
	readonly currentUser: UserData | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

export const USER_INITIAL_STATE: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (
	state = USER_INITIAL_STATE,
	action = {} as AnyAction
) => {
	if (signInSuccess.match(action)) {
		return { ...state, currentUser: action.payload };
	}

	if (signOutSuccess.match(action)) {
		return { ...state, currentUser: null };
	}

	if (
		signOutFailed.match(action) ||
		signInFailure.match(action) ||
		signUpFailed.match(action)
	) {
		return { ...state, error: action.payload };
	}

	return state;
};

/* {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
			return { ...state, currentUser: payload };
		case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
			return { ...state, currentUser: null };
		case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
		case USER_ACTION_TYPES.SIGN_IN_FAILURE:
		case USER_ACTION_TYPES.SIGN_UP_FAILURE:
			return { ...state, error: payload };

		default:
			return state;
	}
};
 */
