import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { checkUserSession } from "./store/user/user.action";
import Footer from "./components/footer/footer-component";
import Header from "./routes/header/header.component";
import UserProfile from "./components/user-profile/user-profile.component";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkUserSession());
	}, [dispatch]);

	return (
		<div className="app-container" style={{ backgroundColor: "#faf9f6" }}>
			<Navigation />
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
				<Route path="auth/profile" element={<UserProfile />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;

/*
wie es ursprünglich war... vielleict lasse ich es so und ich werde noch ein extra header machen ?

		<div className="app-container">
			<Routes>
				<Route path="/" element={<Navigation />}>
					<Route path="/" index element={<Home />} />
					<Route path="shop/*" element={<Shop />} />
					<Route path="auth" element={<Authentication />} />
					<Route path="checkout" element={<Checkout />} />
				</Route>
			</Routes>
		</div>


*/
