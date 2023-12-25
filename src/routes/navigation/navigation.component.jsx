import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { userSignOut } from "../../utils/firebase/firebase.utils";

import {
	NavigationContainer,
	NavLinks,
	NavLink,
	LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to="/">
					<CrwnLogo className="Logo" />
				</LogoContainer>
				<NavLinks>
					<NavLink to="/shop">SHOP</NavLink>

					{currentUser ? (
						<NavLink as="span" onClick={userSignOut}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to="/auth">SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
				{/*if both true, return the last thing u gave(dropdown)  */}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;

/* this is all what was before in NavigationContainer/which was a divTag before now its different when using styled components

<div>
	<Link className="logo-container" to="/">
		<CrwnLogo className="Logo" />
	</Link>
	<div className="nav-links-container">
		<Link className="nav-link" to="/shop">
			SHOP
		</Link>

		{currentUser ? (
			<span className="nav-link" onClick={userSignOut}>
				SIGN OUT
			</span>
		) : (
			<Link className="nav-link" to="/auth">
				SIGN IN
			</Link>
		)}
		<CartIcon />
	</div>
	{isCartOpen && <CartDropdown />}{" "}
	if both true, return the last thing u gave(dropdown)  
		</div> 
*/
