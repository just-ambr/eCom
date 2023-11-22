import {
	auth,
	googlePopupSignIn,
	googleRedirectSignIn,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await googlePopupSignIn();
		console.log(user);
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>I am the SignIn Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			<button onClick={googleRedirectSignIn}>
				Sign in with Google Redirect
			</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
