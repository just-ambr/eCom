// import {
// 	BaseButton,
// 	GoogleSignInButton,
// 	InvertedButton,
// 	ButtonSpinner,
// } from "./button.styles";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
	base: "base",
	google: "google-sign-in",
	inverted: "inverted",
};

//TODO muss nochmal angucken wie ich das mit buttonType mache, da es das ja garnicht mehr gibt ???
// const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
// 	({
// 		[BUTTON_TYPE_CLASSES.base]: BaseButton,
// 		[BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
// 		[BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
// 	}[buttonType]);

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
	return (
		<button
			className={`button-container ${
				BUTTON_TYPE_CLASSES[buttonType] || BUTTON_TYPE_CLASSES.base
			}`}
			disabled={isLoading}
			{...otherProps}>
			{isLoading ? <div className="button-spinner" /> : children}
		</button>
	);
};

export default Button;

/* before styled components like this
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
	google: "google-sign-in",
	inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}>
			{children}
		</button>
	);
};

export default Button;
*/
