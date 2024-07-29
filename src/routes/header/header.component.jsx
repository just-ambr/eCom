import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

//import { ReactComponent as SkincareLogo } from "../../assets/skincare-logo1-transp.svg";
//import { ReactComponent as SkincareLogo } from "../../assets/crown.svg";
import "./header.styles.scss";

import React, { useState } from "react";

const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<header className="header" style={{ backgroundColor: "#faf9f6" }}>
			<div className="header-brand"></div>
			<nav className="header-nav">
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>SKIN CARE</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<Link to="/shop/skincare/cleansers">Cleansers</Link>
							<Link to="/shop/skincare/moisturizers">
								Moisturizers
							</Link>
							<Link to="/shop/skincare/serums">
								Serums and Essences
							</Link>
							<Link to="/shop/skincare/masks">
								Masks and Peelings
							</Link>
							<Link to="/shop/skincare/sunprotection">
								Sun Protection
							</Link>
							<Link to="/shop/skincare/lipoils,lipmasks">
								Lip Caree
							</Link>
							{/* Weitere Dropdown-Links */}
						</div>
					)}
				</div>
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>BODY CARE</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/bodycare/showergel">Shower Gel</a>
							<a href="/shop/bodycare/bodylotion">Body Lotions</a>
							<a href="/shop/bodycare/handcare">
								Hand and Foot Care
							</a>

							<a href="/shop/bodycare/showergel">Body Oils</a>
							<a href="/shop/bodycare/showergel">Body Peelings</a>
							<a href="/shop/bodycare/showergel">
								Sun Protection
							</a>
							{/* Weitere Dropdown-Links */}
						</div>
					)}
				</div>
				{/* Weitere Nav-Items */}
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>HAIR CARE</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/haircare/shampoo">Shampoos</a>
							<a href="/shop/haircare/shampoo">Conditioners</a>
							<a href="/shop/haircare/shampoo">
								Hair Masks & Hair Treatments
							</a>
							<a href="/shop/haircare/shampoo">
								Hair + Scalp Oils & Scalp Care
							</a>

							{/* Weitere Dropdown-Links */}
						</div>
					)}
				</div>
				{/* Weitere Nav-Items */}
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>ACCESSOIRES</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/accessoires/">Tools</a>
							<a href="/shop/accessoires/">Techs</a>

							{/* Weitere Dropdown-Links */}
						</div>
					)}
				</div>
				{/* Weitere Nav-Items */}
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>OUR BOXES</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/boxes">All Boxes</a>

							{/* Weitere Dropdown-Links */}
						</div>
					)}
				</div>
				{/* Weitere Nav-Items */}
				<div
					className="nav-item"
					onMouseEnter={toggleDropdown}
					onMouseLeave={toggleDropdown}>
					<span>SKIN CONCERNS</span>
					{isDropdownOpen && (
						<div className="dropdown">
							<a href="/shop/skinconcerns/antiaging">
								Anti-Aging
							</a>
							<a href="/shop/skinconcerns/antiaging">
								Sensitive Skin
							</a>
							<a href="/shop/skinconcerns/antiaging">
								Acne Prone Skin
							</a>
							<a href="/shop/skinconcerns/antiaging">Dry Skin</a>
							<a href="/shop/skinconcerns/antiaging">Oily Skin</a>
							{/* Weitere Dropdown-Links */}
						</div>
					)}
				</div>
				{/* Weitere Nav-Items */}
			</nav>
			<div className="header-actions">
				{/* Aktionsbuttons wie Warenkorb, Suche, Anmelden etc. */}
			</div>
		</header>
	);
};

export default Header;
