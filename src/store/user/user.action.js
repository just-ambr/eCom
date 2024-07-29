import { USER_ACTION_TYPES } from "./user.types";

import { createAction } from "../../utils/reducer/reducer.utils";
import {
	getUserDocument,
	updateUserDocument,
} from "../../utils/firebase/firebase.utils";

export const setCurrentUser = (user) =>
	createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

/*
	CHECK_USER_SESSION: "user/CHECK_USER_SESSION",
	GOOGLE_SIGN_IN_START: "user/GOOGLE_SIGN_IN_START",
	EMAIL_SIGN_IN_START: "user/EMAIL_SIGN_IN_START",
	SIGN_IN_SUCCESS: "user/SIGN_IN_SUCCESS",
	SIGN_IN_FAILURE: "user/SIGN_IN_FAILURE",
	*/

export const checkUserSession = () =>
	createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
	createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) =>
	createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
	createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = (error) =>
	createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

export const signUpStart = (email, password, displayName) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_START, {
		email,
		password,
		displayName,
	});

export const signUpSuccess = (user, additionalDetails) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
		user,
		additionalDetails,
	});

export const signUpFailed = (error) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
	createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
	createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
	createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

//TODO added for user-profile.comp

export const fetchUserDataStart = (uid) =>
	createAction(USER_ACTION_TYPES.FETCH_USER_DATA_START, { uid });

export const fetchUserDataSuccess = (userData) =>
	createAction(USER_ACTION_TYPES.FETCH_USER_DATA_SUCCESS, userData);

export const fetchUserDataFailure = (error) =>
	createAction(USER_ACTION_TYPES.FETCH_USER_DATA_FAILURE, error);

export const updateUserDataStart = (uid, updatedData) =>
	createAction(USER_ACTION_TYPES.UPDATE_USER_DATA_START, {
		uid,
		updatedData,
	});

export const updateUserDataSuccess = (updatedData) =>
	createAction(USER_ACTION_TYPES.UPDATE_USER_DATA_SUCCESS, updatedData);

export const updateUserDataFailure = (error) =>
	createAction(USER_ACTION_TYPES.UPDATE_USER_DATA_FAILURE, error);
