import { Outlet } from "react-router-dom";

import Directory from "../../components/directory/directory.component";
import Footer from "../../components/footer/footer-component";
import BrandsComponent from "../../components/brands/brands-component";
import TopCategories from "../../components/top-category/top-category.component";

import { categories } from "../../components/directory/directory.component";

import "./home.styles.scss";
import BestSeller from "../../components/best-seller/best-seller.component";
import ImageSlider from "../../components/image-slider/image-slider.component";
import CarouselComponent from "../../components/carousel/carousel.component";
import BrandSlider from "../../components/brand-slider/brand-slider.component";
import OurBoxes from "../../components/our-boxes/our-boxes.component";
import UserProfile from "../../components/user-profile/user-profile.component";

const Home = () => {
	return (
		<div className="home-container">
			<Outlet />

			<ImageSlider />
			<Directory />
			<CarouselComponent />
			<OurBoxes />
			<TopCategories categories={categories} />

			<BrandSlider />
			<BrandsComponent />
		</div>
	);
};

export default Home;
