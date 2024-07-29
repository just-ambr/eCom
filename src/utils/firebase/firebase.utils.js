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
	deleteDoc,
	updateDoc,
	where,
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase()); //TODO
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log("doneeeee!");
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) {
		return;
	}

	const userDocRef = doc(db, "users", userAuth.uid);

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
	return userDocRef;
};

export const userAuthCreationWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const userAuthSignInWithEmailAndPassword = async (email, password) => {
	if (!email || !password) {
		return;
	}

	return await signInWithEmailAndPassword(auth, email, password);
};

export const userSignOut = async () => {
	signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
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

export const getCurrentUser = () => {
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

//TODO
// TODO !!

// Diese Funktion fügt das Feld 'sellingCount' zu jedem Item in jeder Kategorie hinzu.
export const addFieldToItems = async () => {
	// Referenz zur 'categories'-Kollektion in der Datenbank
	const categoriesRef = collection(db, "categories");
	// Ein Snapshot der 'categories'-Kollektion erhalten
	const categoriesSnapshot = await getDocs(categoriesRef);

	// Ein Schreibbatch beginnen
	const batch = writeBatch(db);

	// Über jede Kategorie iterieren
	categoriesSnapshot.forEach((categoryDoc) => {
		// Ein neues Array für die 'items' erstellen, das die aktualisierten Objekte enthält
		const newItems = categoryDoc.data().items.map((item) => {
			// Dem 'item'-Objekt das neue Feld 'sellingCount' hinzufügen, falls nicht vorhanden
			return { ...item, brand: item.brand || "" };
		});

		// Referenz zum aktuellen Dokument der Kategorie
		const categoryDocRef = doc(db, "categories", categoryDoc.id);
		// Das aktualisierte 'items'-Array im Batch-Verfahren setzen
		batch.update(categoryDocRef, { items: newItems });
	});

	// Den Schreibbatch ausführen
	await batch.commit();
	console.log(
		"Alle 'items' wurden erfolgreich aktualisiert mit 'sellingCount'."
	);
};
// Diese Funktion dann irgendwo in deinem Code aufrufen, um den Prozess zu starten.
//addFieldToItems();

// updates empty values when already a value exists and can rename oldvalues to new ones by its count
export const updateFieldValueForItems = async (
	collectionName,
	docName,
	key,
	oldValue,
	newValue,
	limit
) => {
	const docRef = doc(db, collectionName, docName);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		console.log("Das Dokument existiert nicht.");
		return;
	}

	const itemsArray = docSnap.data().items;
	let updateCount = 0;

	// Aktualisiere nur die Items, die den Bedingungen entsprechen
	const updatedItems = itemsArray.map((item) => {
		// Überprüfe, ob das Feld leer ist oder den alten Wert enthält
		if (
			(item[key] === "" || item[key] === oldValue) &&
			updateCount < limit
		) {
			updateCount++; // Zähle die Anzahl der Updates
			return { ...item, [key]: newValue }; // Setze den neuen Wert
		}
		return item; // Keine Änderung für dieses Item
	});

	// Aktualisiere das Dokument mit den aktualisierten Items
	await updateDoc(docRef, { items: updatedItems });
	console.log(`${updateCount} Items wurden zu '${newValue}' aktualisiert.`);
};

// Beispielaufuf der Funktion:
//updateFieldValueForItems("categories", "sneakers", "brand", "", "Adidas", 1);
//updateFieldValueForItems('categories', 'sneakers', 'brand', 'Adidas', 'Nike', 2);

// TODO !! ENDE

// TODO !!
// Funktion zum Umbenennen eines Dokuments in der Firestore-Datenbank und deren title feld
export const updateDocumentNameAndTitleField = async (
	collectionName,
	oldDocName,
	newDocName
) => {
	const oldDocRef = doc(db, collectionName, oldDocName);
	const newDocRef = doc(db, collectionName, newDocName);

	try {
		// Altes Dokument abrufen
		const oldDocSnap = await getDoc(oldDocRef);
		if (!oldDocSnap.exists()) {
			console.log("Das zu umbenennende Dokument existiert nicht!");
			return;
		}

		// Kopiere die alten Daten und setze den neuen Titel
		const oldData = oldDocSnap.data();
		const newData = { ...oldData, title: newDocName }; // Setze den neuen Titel

		// Neues Dokument mit den angepassten Daten erstellen
		await setDoc(newDocRef, newData);

		// Altes Dokument löschen
		await deleteDoc(oldDocRef);
		console.log(
			`Dokument wurde erfolgreich von '${oldDocName}' zu '${newDocName}' umbenannt.`
		);
	} catch (error) {
		console.error("Fehler beim Umbenennen des Dokuments:", error);
	}
};
//updateDocumentNameAndTitleField("categories", "sneakers", "skinconcerns");
// TODO !! ENDE

// TODO !!
// Funktion zum Hinzufügen eines neuen Dokuments mit den gleichen Feldern wie ein vorhandenes Dokument, aber mit dem angepassten title field
export const addNewDocumentWithSameFields = async (
	collectionName,
	newDocName,
	exampleDocName
) => {
	const exampleDocRef = doc(db, collectionName, exampleDocName);
	const newDocRef = doc(db, collectionName, newDocName);

	try {
		// Beispiel-Dokument holen
		const exampleDocSnap = await getDoc(exampleDocRef);
		if (!exampleDocSnap.exists()) {
			console.log("Beispiel-Dokument existiert nicht!");
			return;
		}

		// Kopiere die alten Daten und setze den neuen Titel
		const newData = { ...exampleDocSnap.data(), title: newDocName }; // Aktualisiere den Titel

		// Neues Dokument mit den angepassten Daten erstellen
		await setDoc(newDocRef, newData);
		console.log(
			"Neues Dokument mit aktualisiertem Titel erfolgreich hinzugefügt."
		);
	} catch (error) {
		console.error("Fehler beim Hinzufügen eines neuen Dokuments:", error);
	}
};
//addNewDocumentWithSameFields("categories", "haircare", "skincare");

// TODO !! ENDE

// TODO !! (UNSPLASH check Notability)
//Bilder von Unsplash abrufen

// die aktualisierten Bild-URLs in deiner Firestore-Datenbank speichert.
// Der Aufruf dieser Funktion erfolgt über die Netlify-Funktion, nachdem die Bilder von Unsplash abgerufen wurden..
// ... andere imports und Firebase-Setup

// In deinem Service-Ordner oder dort, wo du Netzwerkanfragen verwaltest
const updateImageForCategory = async (categoryTitle) => {
	const functionEndpoint = "/.netlify/functions/unsplash";
	try {
		const response = await fetch(functionEndpoint, {
			method: "POST",
			body: JSON.stringify({ searchTerm: categoryTitle }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const { imageUrls } = await response.json();
		return imageUrls; // Jetzt ein Array von URLs
	} catch (error) {
		console.error("Fehler beim Abrufen der Bilder: ", error);
		return [];
	}
};

export const updateCategoryImageUrls = async () => {
	const categoriesSnapshot = await getDocs(collection(db, "categories"));
	const batch = writeBatch(db);

	for (const categoryDoc of categoriesSnapshot.docs) {
		const categoryData = categoryDoc.data();
		const imageUrls = await updateImageForCategory(categoryData.title); // Ein Array von URLs

		if (imageUrls.length > 0) {
			const updatedItems = categoryData.items.map((item, index) => {
				// Wir holen ein einzigartiges Bild für jedes Produkt, indem wir das Array wiederholen
				const imageUrl = imageUrls[index % imageUrls.length];
				return { ...item, imageUrl };
			});

			batch.update(categoryDoc.ref, { items: updatedItems });
		} else {
			console.error(
				`Keine Bilder für Kategorie ${categoryData.title} gefunden, überspringe Update.`
			);
		}
	}

	await batch.commit();
	console.log("Kategoriebilder wurden aktualisiert.");
};
// TODO !! ENDE

// TODO !!
export const addMultipleItemsToDocument = async (
	collectionName,
	docName,
	numberOfItems
) => {
	const docRef = doc(db, collectionName, docName);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		console.log(
			"Das Dokument existiert nicht und kann daher nicht aktualisiert werden."
		);
		return;
	}

	const itemsArray = docSnap.data().items;
	if (itemsArray.length === 0) {
		console.log("Keine Items zum Kopieren vorhanden.");
		return;
	}

	const lastItem = itemsArray[itemsArray.length - 1];
	const lastItemId = lastItem.id;

	// Starte die ID für neue Items
	let newItemId = lastItemId;

	// Erstelle neue Items basierend auf dem letzten Item in der Liste
	for (let i = 0; i < numberOfItems; i++) {
		newItemId++; // Inkrementiere die ID für jedes neue Item
		const newItem = {
			...lastItem,
			id: newItemId, // Setze die neue ID
			name: `Neues Produkt ${newItemId}`, // Optional: Erstelle einen einzigartigen Namen
			// Hier kannst du weitere Felder anpassen
		};
		itemsArray.push(newItem);
	}

	// Aktualisiere das Dokument mit der neuen Items-Liste
	await updateDoc(docRef, { items: itemsArray });
	console.log(
		`Es wurden ${numberOfItems} neue Items zum Dokument "${docName}" hinzugefügt.`
	);
};
// Zum Beispiel, um 21 neue "sneaker" Items hinzuzufügen, würdest du die Funktion so aufrufen:
//addMultipleItemsToDocument("categories", "bathandbody", 10);

// Und um 31 neue "womens" Items hinzuzufügen, so:
//addMultipleItemsToDocument("categories", "haircare", 14);

// Id update after I added new items into db
export const reassignItemIDs = async (collectionName) => {
	const collectionRef = collection(db, collectionName);
	const batch = writeBatch(db);

	// Alle Dokumente in der Sammlung abrufen
	const querySnapshot = await getDocs(collectionRef);
	let currentId = 1; // Startet die ID-Zählung bei 1

	querySnapshot.forEach((docSnapshot) => {
		const items = docSnapshot.data().items.map((item) => {
			return { ...item, id: currentId++ }; // Inkrementiere die ID für jedes Item
		});

		// Bereite das Batch-Update vor
		batch.update(docSnapshot.ref, { items });
	});

	// Führe das Batch-Update aus
	await batch.commit();
	console.log("Alle Item-IDs wurden neu zugewiesen.");
};
// Aufruf der Funktion
//reassignItemIDs("categories");
// TODO !! ENDE

// TODO !!
// entfernt items in einem document nach id, damit man nicht alle einzeln löschen muss
export const deleteItemsInRange = async (
	collectionName,
	docName,
	startId,
	endId
) => {
	const docRef = doc(db, collectionName, docName);
	const docSnap = await getDoc(docRef);

	if (!docSnap.exists()) {
		console.log("Das Dokument existiert nicht.");
		return;
	}

	const itemsArray = docSnap.data().items;
	// Filtere die Items, die nicht gelöscht werden sollen
	const filteredItems = itemsArray.filter((item) => {
		return !(item.id >= startId && item.id <= endId);
	});

	// Aktualisiere das Dokument mit der neuen Liste von Items
	await updateDoc(docRef, { items: filteredItems });
	console.log(
		`Items von ID ${startId} bis ${endId} in ${docName} wurden erfolgreich gelöscht.`
	);
};
// Beispielaufruf der Funktion:
//deleteItemsInRange("categories", "boxes", 20, 42);

// TODO !! ENDE

// TODO !!
// export const getProductsByCategoryAndSubCategory = async (
// 	category,
// 	subcategory
// ) => {
// 	// Zugriff auf das spezifische Dokument der Kategorie
// 	const categoryDocRef = doc(db, "categories", category);

// 	// Dokument abrufen
// 	const categoryDocSnapshot = await getDoc(categoryDocRef);

// 	// Überprüfen, ob das Dokument existiert
// 	if (categoryDocSnapshot.exists()) {
// 		// Daten aus dem Dokument abrufen
// 		const categoryData = categoryDocSnapshot.data();

// 		// Filtere die Produkte basierend auf der `subCategory`
// 		const filteredProducts = categoryData.items.filter(
// 			(item) => item.subCategory === subcategory
// 		);

// 		console.log("Abgefragte Produkte:", filteredProducts); // Konsolenausgabe zum Debuggen

// 		return filteredProducts;
// 	} else {
// 		console.log("Dokument nicht gefunden:", category);
// 		return [];
// 	}
// };
export const getProductsByCategoryAndSubCategories = async (
	category,
	subcategories
) => {
	// Zugriff auf das spezifische Dokument der Kategorie

	const categoryDocRef = doc(db, "categories", category);

	// Dokument abrufen
	const categoryDocSnapshot = await getDoc(categoryDocRef);

	// Überprüfen, ob das Dokument existiert
	if (categoryDocSnapshot.exists()) {
		// Daten aus dem Dokument abrufen
		const categoryData = categoryDocSnapshot.data();

		// Filtere die Produkte basierend auf den `subCategory`-Werten
		const filteredProducts = categoryData.items.filter((item) =>
			subcategories.includes(item.subCategory)
		);

		console.log("Abgefragte Produkte:", filteredProducts); // Konsolenausgabe zum Debuggen

		return filteredProducts;
	} else {
		console.log("Dokument nicht gefunden:", category);
		return [];
	}
};

// TODO !! ENDE

// TODO !!
export const fetchProductsBySubCategory = async (category, subCategory) => {
	const ref = collection(db, category);
	const q = query(ref, where("subCategory", "==", subCategory));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
// ich glaube es funktioniert jetzt, nun möchte ich aber mehrere subCategory in shop/skincare/lipcare gefiltert haben. Und zwar subCategory "lipoils" und "lipmasks" sollen angezeigt werden. Kannst du das im code anpassen, damit es funktioneirt
// TODO !! ENDE

export const getBrands = async () => {
	const collectionRef = collection(db, "brands");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const getOurBoxes = async () => {
	const docRef = doc(db, "categories", "boxes");
	const docSnapshot = await getDoc(docRef);

	if (docSnapshot.exists()) {
		return docSnapshot.data().items;
	} else {
		console.log("Sorry, there is not a Document like this!");
		return [];
	}
};

export const getUsers = async () => {
	const docRef = doc(db, "users", "userDocumentId"); // "userDocumentId" ersetzen durch Ihre Dokument-ID
	const docSnapshot = await getDoc(docRef);

	if (docSnapshot.exists()) {
		return docSnapshot.data().items; // Vorausgesetzt, dass Ihre Benutzerdaten in einem Array namens 'items' gespeichert sind
	} else {
		console.log("No users");
		return [];
	}
};

export const addMultipleDocumentsToCollection = async (
	collectionName,
	exampleDocId,
	numberOfDocuments
) => {
	const exampleDocRef = doc(db, collectionName, exampleDocId);
	const exampleDocSnap = await getDoc(exampleDocRef);

	if (!exampleDocSnap.exists()) {
		console.log("Beispiel-Dokument existiert nicht!");
		return;
	}

	const exampleData = exampleDocSnap.data();
	const batch = writeBatch(db);
	const collectionRef = collection(db, collectionName);

	for (let i = 0; i < numberOfDocuments; i++) {
		const newDocRef = doc(collectionRef); // Automatically generate a unique ID
		batch.set(newDocRef, exampleData);
	}

	try {
		await batch.commit();
		console.log(`${numberOfDocuments} Dokumente erfolgreich erstellt.`);
	} catch (error) {
		console.error("Fehler beim Hinzufügen von Dokumenten:", error);
	}
};

// Aufruf der Funktion, um 19 neue Dokumente in der Sammlung "brands" hinzuzufügen:
//addMultipleDocumentsToCollection("brands", "b", 3);

export const addDescriptionFieldToAllDocuments = async (collectionName) => {
	try {
		const collectionRef = collection(db, collectionName);
		const querySnapshot = await getDocs(collectionRef);
		const batch = writeBatch(db);

		querySnapshot.forEach((docSnapshot) => {
			const docRef = doc(db, collectionName, docSnapshot.id);
			batch.update(docRef, { description: "Default description" }); // Set a default description
		});

		await batch.commit();
		console.log(
			"Feld 'description' wurde erfolgreich zu allen Dokumenten hinzugefügt."
		);
	} catch (error) {
		console.error(
			"Fehler beim Hinzufügen des Feldes 'description':",
			error
		);
	}
};

// Aufruf der Funktion, um das Feld "description" zu allen Dokumenten in der Sammlung "brands" hinzuzufügen:
//addDescriptionFieldToAllDocuments("brands");

// TODO !! user-profile
export const getUserDocument = async (uid) => {
	if (!uid) return;

	const userDocRef = doc(db, "users", uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		console.log("No user data found");
		return null;
	}

	return { id: userSnapshot.id, ...userSnapshot.data() };
};

export const updateUserDocument = async (uid, updatedData) => {
	if (!uid || !updatedData) return;

	const userDocRef = doc(db, "users", uid);

	try {
		await updateDoc(userDocRef, updatedData);
	} catch (error) {
		console.log("Error updating user data: ", error);
	}
};
// TODO !! ENDE user-profile
