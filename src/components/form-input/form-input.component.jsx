//import { FormInputLabel, Input, Group } from "./form-input.styles";

import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
	const { value = "" } = otherProps; // Default value to an empty string

	return (
		<div className="group">
			<input className="form-input" {...otherProps} />
			{label && (
				<label
					className={`${
						value.length ? "shrink" : ""
					} form-input-label`}>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;

/*
import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
	return (
		<div className="group">
			<input className="form-input" {...otherProps} />
			{label && (
				<label
					className={`${
						otherProps.value.length ? "shrink" : ""
					} form-input-label`}>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;
*/
