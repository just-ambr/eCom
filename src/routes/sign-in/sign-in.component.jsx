import {
	googlePopupSignIn,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUse = async () => {
		const { user } = await googlePopupSignIn();
		console.log(user);
		createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>I am the SignIn Page</h1>
			<button onClick={logGoogleUse}>Sign in with Google Popup</button>
		</div>
	);
};

export default SignIn;
