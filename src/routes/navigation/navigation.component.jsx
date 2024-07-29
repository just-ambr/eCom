import { Fragment, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";
import { setIsCartOpen } from "../../store/cart/cart.action";

import { ReactComponent as SkincareLogo } from "../../assets/skincare-logo1-transp.svg";
import "./navigation.styles.scss";

const Navigation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartDropdownRef = useRef(null);
	const cartIconRef = useRef(null);

	const signOutUser = () => {
		dispatch(signOutStart());
		navigate("/auth"); // Leite zur Startseite weiter
	};

	const handleClickOutside = (event) => {
		if (
			cartDropdownRef.current &&
			!cartDropdownRef.current.contains(event.target) &&
			cartIconRef.current &&
			!cartIconRef.current.contains(event.target)
		) {
			dispatch(setIsCartOpen(false));
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<Fragment>
			<div className="navigation">
				<div className="nav-spacer"></div>
				<Link className="logo-container" to="/">
					<SkincareLogo className="logo" />
				</Link>

				<div className="nav-links-container">
					{currentUser ? (
						<Link className="nav-link" to="auth/profile">
							MY PROFILE
						</Link>
					) : (
						<p></p>
					)}

					<Link className="nav-link" to="/shop">
						SHOP ALL
					</Link>

					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}

					<div ref={cartIconRef}>
						<CartIcon />
					</div>
				</div>
				{isCartOpen && (
					<div ref={cartDropdownRef}>
						<CartDropdown />
					</div>
				)}
			</div>

			<Outlet />
		</Fragment>
	);
};

export default Navigation;
