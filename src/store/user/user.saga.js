import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
	signInSuccess,
	signInFailure,
	signUpSuccess,
	signUpFailed,
	signOutSuccess,
	signOutFailed,
	fetchUserDataSuccess,
	fetchUserDataFailure,
	updateUserDataSuccess,
	updateUserDataFailure,
} from "./user.action";

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	googlePopupSignIn,
	userAuthSignInWithEmailAndPassword,
	userAuthCreationWithEmailAndPassword,
	userSignOut,
	getUserDocument,
	updateUserDocument,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
	try {
		const userSnapshot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data }));
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(googlePopupSignIn);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield call(
			userAuthSignInWithEmailAndPassword,
			email,
			password
		);
		yield call(getSnapshotFromUserAuth, user);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (error) {
		yield put(signInFailure(error));
	}
}

export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(
			userAuthCreationWithEmailAndPassword,
			email,
			password
		);
		yield put(signUpSuccess(user, { displayName }));
	} catch (error) {
		yield put(signUpFailed(error));
	}
}

export function* signOut() {
	try {
		yield call(userSignOut);
		yield put(signOutSuccess());
	} catch (error) {
		yield put(signOutFailed(error));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
	yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

//TODO added this in for user-profile.comp
export function* fetchUserData({ payload: { uid } }) {
	try {
		const userData = yield call(getUserDocument, uid);
		yield put(fetchUserDataSuccess(userData));
	} catch (error) {
		yield put(fetchUserDataFailure(error));
	}
}

export function* updateUserData({ payload: { uid, updatedData } }) {
	try {
		yield call(updateUserDocument, uid, updatedData);
		yield put(updateUserDataSuccess(updatedData));
	} catch (error) {
		yield put(updateUserDataFailure(error));
	}
}

//TODO ENDE

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

//TODO added this in for user-profile.comp
export function* onFetchUserDataStart() {
	yield takeLatest(USER_ACTION_TYPES.FETCH_USER_DATA_START, fetchUserData);
}

export function* onUpdateUserDataStart() {
	yield takeLatest(USER_ACTION_TYPES.UPDATE_USER_DATA_START, updateUserData);
}
//TODO ENDE

export function* userSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
		call(onFetchUserDataStart),
		call(onUpdateUserDataStart),
	]);
}
