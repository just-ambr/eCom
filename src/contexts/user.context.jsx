import { createContext, useState, useEffect, useReducer } from "react";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// the actual value you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
	console.log("dispaaaatchedddddddddd 🙂");
	console.log(action);
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: payload };

		default:
			throw new Error(`Unhandled type ${type} in userReducer !!`);
	}
};

const INITIAL_STATE = {
	currentUser: null,
};

export const UserProvider = ({ children }) => {
	//	const [currentUser, setCurrentUser] = useState(null);
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
	const { currentUser } = state;
	console.log(currentUser);

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
	};

	const value = { currentUser, setCurrentUser };
	useEffect(() => {
		const unSubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}

			setCurrentUser(user);
		});
		return unSubscribe;
	}, []);

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

/* Context two pieces:
One -> Actual storage thing itself (UserContext)
Two -> Provider the actual Component you wrap above the <app/>
*/
