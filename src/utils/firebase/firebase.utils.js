import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyACcOtWL7D8jSyeoOQRYx0GPQRaNl3SP1w",
	authDomain: "ecom-db-7196c.firebaseapp.com",
	projectId: "ecom-db-7196c",
	storageBucket: "ecom-db-7196c.appspot.com",
	messagingSenderId: "186818674219",
	appId: "1:186818674219:web:08c36ca04df124172f746e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//Initialize Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const googlePopupSignIn = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot.exists());

	//if user data not exists
	//create / set the document with the data from useAuth in my collection
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log(
				"Error creating the user!! Here is the error message: ",
				error.message
			);
		}
	}
	// if user data existss
	//return userdocref
	return userDocRef;
};
