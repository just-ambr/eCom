import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";

import {
	fetchUserDataStart,
	updateUserDataStart,
} from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";

import "./user-profile.styles.scss";

const UserProfile = () => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [activeSection, setActiveSection] = useState("profile");
	const currentUser = useSelector(selectCurrentUser);
	const [userData, setUserData] = useState({
		email: "",
		firstName: "",
		lastName: "",
		street: "",
		houseNumber: "",
		zipCode: "",
		country: "",
		phone: "",
	});

	const [purchases] = useState([
		{
			date: "20.05.2020 15:33",
			product: "Kikkoman Soja Sauce 150ml",
			quantity: 3,
			orderNumber: "000234",
			shipping: "Standard Versand",
			status: "Versandt: Ankunft voraussichtlich am 22.05.2020",
		},
		{
			date: "20.05.2020 15:33",
			product: "Kikkoman Soja Sauce 150ml",
			quantity: 3,
			orderNumber: "000234",
			shipping: "Schneller Versand",
			status: "Offen",
		},
		{
			date: "20.05.2020 15:33",
			product: "Kikkoman Soja Sauce 150ml",
			quantity: 3,
			orderNumber: "000234",
			shipping: "Standard Versand",
			status: "Zur Lieferung bereit",
		},
		// Add more purchases as needed
	]);

	const [favorites] = useState([
		{
			title: "Lieblings Saucen",
			items: [
				{ title: "Item 1", price: "00,00€" },
				{ title: "Item 2", price: "00,00€" },
			],
		},
		{
			title: "Lieblings aus dem Japanischen",
			items: [
				{ title: "Item 1", price: "00,00€" },
				{ title: "Item 2", price: "00,00€" },
			],
		},
		{
			title: "Lieblings aus dem Vietnamesischen",
			items: [
				{ title: "Item 1", price: "00,00€" },
				{ title: "Item 2", price: "00,00€" },
			],
		},
		{
			title: "Lieblings aus dem Russischen",
			items: [
				{ title: "Item 1", price: "00,00€" },
				{ title: "Item 2", price: "00,00€" },
			],
		},
		// Add more favorites as needed
	]);

	useEffect(() => {
		if (currentUser) {
			setUserData(currentUser);
		}
	}, [currentUser]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const toggleEditMode = () => {
		if (isEditing) {
			// Save changes
			dispatch(updateUserDataStart(currentUser.id, userData));
		}
		setIsEditing(!isEditing);
	};

	useEffect(() => {
		console.log("currentUser:", currentUser);
		if (currentUser && !currentUser.fetched) {
			console.log("Fetching user data for:", currentUser.id);
			dispatch(fetchUserDataStart(currentUser.id));
		} else if (currentUser) {
			setUserData({
				email: currentUser.email || "",
				firstName: currentUser.firstName || "",
				lastName: currentUser.lastName || "",
				street: currentUser.street || "",
				houseNumber: currentUser.houseNumber || "",
				zipCode: currentUser.zipCode || "",
				country: currentUser.country || "",
				phone: currentUser.phone || "",
			});
		}
	}, [dispatch, currentUser]);

	const renderProfile = () => (
		<div className="profile-section">
			<h2>My Profile</h2>
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
				label="House No."
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
			<div className="user-info">
				<label>Country:</label>
				{isEditing ? (
					<select
						name="country"
						value={userData.country}
						onChange={handleInputChange}>
						<option value="Germany">Germany</option>
						<option value="Switzerland">Switzerland</option>
						<option value="Austria">Austria</option>
					</select>
				) : (
					<span>{userData.country}</span>
				)}
			</div>
			<FormInput
				label="Phone"
				type="text"
				name="phone"
				value={userData.phone}
				onChange={handleInputChange}
				disabled={!isEditing}
			/>
			<button onClick={toggleEditMode}>
				{isEditing ? "Save" : "Edit"}
			</button>
		</div>
	);

	const renderPurchases = () => (
		<div className="purchases-section">
			<h2>My Orders/Purchases?</h2>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Product</th>
						<th>Quantity</th>
						<th>Ordernumber</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{purchases.map((purchase, index) => (
						<tr key={index}>
							<td>{purchase.date}</td>
							<td>{purchase.product}</td>
							<td>{purchase.quantity}</td>
							<td>{purchase.orderNumber}</td>

							<td>
								<button>Show</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

	const renderFavorites = () => (
		<div className="favorites-section">
			<h2>My Favorites</h2>
			{favorites.map((favorite, index) => (
				<div key={index} className="favorite-category">
					<h3>{favorite.title}</h3>
					<div className="favorite-items">
						{favorite.items.map((item, itemIndex) => (
							<div key={itemIndex} className="favorite-item">
								<p>{item.title}</p>
								<p>{item.price}</p>
								<button>Go To Checkout</button>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);

	const renderSection = () => {
		switch (activeSection) {
			case "profile":
				return renderProfile();
			case "purchases":
				return renderPurchases();
			case "favorites":
				return renderFavorites();
			default:
				return renderProfile();
		}
	};

	return (
		<div className="user-profile-container">
			<div className="sidebar">
				<ul>
					<li onClick={() => setActiveSection("profile")}>
						My Profile
					</li>
					<li onClick={() => setActiveSection("purchases")}>
						My Orders/Purchases ?
					</li>
					<li onClick={() => setActiveSection("favorites")}>
						My Favorites
					</li>
				</ul>
			</div>
			<div className="content">{renderSection()}</div>
		</div>
	);
};

export default UserProfile;
