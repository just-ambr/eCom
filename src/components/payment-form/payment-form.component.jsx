import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./payment-form.styles.scss";

const PaymentForm = ({ userData, isFormComplete, showForm, isLoggedIn }) => {
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		if (!isFormComplete()) {
			alert("Please fill in the following fields before you buy.");

			showForm();
			return;
		}

		setIsProcessingPayment(true);

		//netlify function (first serverless function)
		const response = await fetch(
			"/.netlify/functions/create-payment-intent",
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ amount: amount * 100 }),
			}
		).then((res) => res.json());

		const clientSecret = response.paymentIntent.client_secret;

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),

				billing_details: {
					// davor so --> name: currentUser ? currentUser.displayName : "Guest",
					name: isLoggedIn
						? currentUser.displayName
						: `${userData.firstName} ${userData.lastName}`,
					email: userData.email,
					address: {
						line1: `${userData.street} ${userData.houseNumber}`,
						postal_code: userData.zipCode,
					},
				},
			},
		});

		setIsProcessingPayment(false);

		if (paymentResult.error) {
			alert(paymentResult.error.message);
		} else {
			if (paymentResult.paymentIntent.status === "succeeded") {
				alert("Payment Successful!");
			}
		}
	};

	return (
		<div className="payment-form-container">
			<form onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement className="CardElement" />
				<div className="payment-button-container">
					<Button
						type="submit"
						isLoading={isProcessingPayment}
						buttonType="inverted">
						Pay now
					</Button>
				</div>
			</form>
		</div>
	);
};

export default PaymentForm;
