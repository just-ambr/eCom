import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import {
	selectCartItems,
	selectCartTotal,
} from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { updateUserDataStart } from "../../store/user/user.action";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";

import "./checkout.styles.scss";

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		street: "",
		houseNumber: "",
		zipCode: "",
	});
	const [formVisible, setFormVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	useEffect(() => {
		if (currentUser) {
			setUserData({
				email: currentUser.email || "",
				firstName: currentUser.firstName || "",
				lastName: currentUser.lastName || "",
				street: currentUser.street || "",
				houseNumber: currentUser.houseNumber || "",
				zipCode: currentUser.zipCode || "",
			});
		}
	}, [currentUser]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
		dispatch(updateUserDataStart(currentUser.id, userData));
	};

	const isFormComplete = () => {
		return Object.values(userData).every((field) => field.trim() !== "");
	};

	const showForm = () => {
		setFormVisible(true);
	};

	return (
		<div className="checkout-container">
			<div className="checkout-header">
				<div className="header-block">
					<span>Product</span>
				</div>
				<div className="header-block">
					<span>Description</span>
				</div>
				<div className="header-block">
					<span>Quantity</span>
				</div>
				<div className="header-block">
					<span>Price</span>
				</div>
				<div className="header-block">
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<div className="total">Total: {cartTotal}€</div>

			<div className="user-data-fetch">
				{currentUser && (
					<>
						<h2>Your Information:</h2>
						<FormInput
							label="Email"
							type="email"
							name="email"
							value={userData.email}
							onChange={handleInputChange}
							disabled={!isEditing}
						/>
						<FormInput
							label="First Name"
							type="text"
							name="firstName"
							value={userData.firstName}
							onChange={handleInputChange}
							disabled={!isEditing}
						/>
						<FormInput
							label="Last Name"
							type="text"
							name="lastName"
							value={userData.lastName}
							onChange={handleInputChange}
							disabled={!isEditing}
						/>
						<FormInput
							label="Street"
							type="text"
							name="street"
							value={userData.street}
							onChange={handleInputChange}
							disabled={!isEditing}
						/>
						<FormInput
							label="House Number"
							type="text"
							name="houseNumber"
							value={userData.houseNumber}
							onChange={handleInputChange}
							disabled={!isEditing}
						/>
						<FormInput
							label="Zip Code"
							type="text"
							name="zipCode"
							value={userData.zipCode}
							onChange={handleInputChange}
							disabled={!isEditing}
						/>
						{isEditing ? (
							<Button onClick={handleSaveClick}>Save</Button>
						) : (
							<Button onClick={handleEditClick}>Edit</Button>
						)}
					</>
				)}
				{!currentUser && formVisible && (
					<>
						<h2>Please fill in your details:</h2>
						<FormInput
							label="Email"
							type="email"
							name="email"
							value={userData.email}
							onChange={handleInputChange}
						/>
						<FormInput
							label="First Name"
							type="text"
							name="firstName"
							value={userData.firstName}
							onChange={handleInputChange}
						/>
						<FormInput
							label="Last Name"
							type="text"
							name="lastName"
							value={userData.lastName}
							onChange={handleInputChange}
						/>
						<FormInput
							label="Street"
							type="text"
							name="street"
							value={userData.street}
							onChange={handleInputChange}
						/>
						<FormInput
							label="House Number"
							type="text"
							name="houseNumber"
							value={userData.houseNumber}
							onChange={handleInputChange}
						/>
						<FormInput
							label="Zip Code"
							type="text"
							name="zipCode"
							value={userData.zipCode}
							onChange={handleInputChange}
						/>
					</>
				)}
			</div>

			<PaymentForm
				userData={userData}
				isFormComplete={isFormComplete}
				showForm={showForm}
				isLoggedIn={!!currentUser}
			/>
		</div>
	);
};

export default Checkout;
