import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { getBrands } from "../../utils/firebase/firebase.utils";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./brand-slider.styles.scss";

const BrandSlider = () => {
	const [brands, setBrands] = useState([]);

	useEffect(() => {
		const fetchBrands = async () => {
			const brandsData = await getBrands();
			setBrands(brandsData);
		};

		fetchBrands();
	}, []);

	return (
		<div className="brand-slider-container">
			<div className="slider-header">
				<h2>About</h2>
				<h1>All Brands</h1>
			</div>
			<Swiper
				modules={[Pagination, Navigation]}
				spaceBetween={50}
				slidesPerView={1}
				navigation
				className="brands-slider">
				{brands.map((brand, index) => (
					<SwiperSlide key={index} className="brands-slider__slide">
						<div className="brand-content">
							<div className="brand-image">
								<img
									src={brand.imageUrl}
									alt={`Brand ${index + 1}`}
								/>
							</div>
							<div className="brand-info">
								<h3>{brand.name}</h3>
								<p>{brand.description}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default BrandSlider;
