import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
	UserCredential,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from "firebase/firestore";

import { Categories } from "../../store/categories/categories.types";

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const googlePopupSignIn = () => signInWithPopup(auth, googleProvider);
export const googleRedirectSignIn = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

type ObjectToAdd = {
	title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase()); //TODO
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("doneeeee!");
};

type CategoryItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

type CategoryData = {
	imageUrl: string;
	items: CategoryItem[];
	title: string;
};

export const getCategoriesAndDocuments = async (): Promise<Categories[]> => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Categories
	);
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation: AdditionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
	if (!userAuth) return;

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
				...additionalInformation,
			});
		} catch (error) {
			if (error === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.log(
					"Error creating the user!! Here is the error message: ",
					error
				);
			}
		}
	}
	// if user data existss
	//return userdocref
	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const userAuthCreationWithEmailAndPassword = async (
	email: string,
	password: string
): Promise<UserCredential | void> => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const userAuthSignInWithEmailAndPassword = async (
	email: string,
	password: string
): Promise<UserCredential | void> => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => {
	signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
	onAuthStateChanged(auth, () => onAuthStateChanged(auth, callback));
};
/** Observer Pattern
 * {
 *  next: callback,
 * error: errorCallback,
 * complete: completeCallback
 * }
 *
 */

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
