import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";

import reportWebVitals from "./reportWebVitals";

import App from "./App";
//REMOVED! import { UserProvider } from "./contexts/user.context";
//REMOVED! import { CategoriesProvider } from "./contexts/categories.context";
//REMOVED! import { CartProvider } from "./contexts/cart.context";
import { store, persistor } from "./store/store";
import { stripePromise } from "./utils/stripe/stripe.utils";

import "./index.scss";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<Elements stripe={stripePromise}>
						<App />
					</Elements>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/* <Helmet>
	<meta
		http-equiv="Content-Security-Policy"
		content="script-src 'self' 'sha256-CBu0w5uiOaPgb2R6Zgf7E0+STJHF4lcPIdhZzQXE6yk=';"
	/>
</Helmet>; */
