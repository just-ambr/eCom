import { InputHTMLAttributes, FC } from "react";

import { FormInputLabel, Input, Group } from "./form-input.styles";

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
	return (
		<Group>
			<Input {...otherProps} />
			{label && (
				<FormInputLabel
					shrink={Boolean(
						otherProps.value &&
							typeof otherProps.value === "string" &&
							otherProps.value.length
					)}>
					{label}
				</FormInputLabel>
			)}
		</Group>
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
