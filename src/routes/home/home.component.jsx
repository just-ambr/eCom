import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";
import Footer from "../../components/footer/footer-component";
import BrandsComponent from "../../components/brands/brands-component";

const Home = () => {
	return (
		<div>
			<Outlet />
			<Directory />

			<BrandsComponent />
			<Footer />
		</div>
	);
};

export default Home;
