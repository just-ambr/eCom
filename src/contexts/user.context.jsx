import { createContext, useState, useEffect } from "react";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// the actual value you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unSubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				console.log(user);
				createUserDocumentFromAuth(user);
			}
			console.log(user);
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
