import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/scss";
import "swiper/scss/parallax";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

import { Parallax, Pagination, Navigation } from "swiper";

import "./routes-slider.styles.scss";

const Slider = ({ startIndex }) => {
	return (
		<>
			<Swiper
				style={{
					"--swiper-navigation-color": "#fff",
					"--swiper-pagination-color": "#fff",
				}}
				speed={600}
				parallax={true}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				scrollbar={{ draggable: true }}
				modules={[Parallax, Pagination, Navigation]}
				initialSlide={startIndex} // Startindex hier setzen
				className="mySwiper">
				<div
					slot="container-start"
					className="parallax-bg"
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1535411821147-2c6ae713a903?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Zmx1aWQsbGlxdWlkfHx8fHx8MTcxNzc4NzMzMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080)",
					}}
					data-swiper-parallax="-23%"></div>
				<SwiperSlide>
					<div className="slide-content">
						<div className="text-content">
							<div className="title" data-swiper-parallax="-300">
								SKIN CARE Slide 1
							</div>
							<div className="text" data-swiper-parallax="-100">
								<p>
									Elevate your skincare game with our
									exclusive selection of products from
									renowned brands. Whether you're battling
									dryness, seeking anti-aging remedies, or
									just looking for a new daily regimen, we
									have the perfect solutions. Our inventory
									includes everything from rich moisturizers
									and soothing toners to potent serums and
									exfoliants. Pamper your skin with the best
									in the market and see visible improvements.
									Start your journey to flawless skin today by
									exploring our wide range of skincare
									essentials.
								</p>
							</div>
						</div>
						<div className="image-container">
							<img
								src="https://i.ibb.co/Hd3KnZ4/skincare.png"
								alt="Slide 1"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="slide-content">
						<div className="text-content">
							<div className="title" data-swiper-parallax="-300">
								BODY CARE Slide 2
							</div>
							<div className="text" data-swiper-parallax="-100">
								<p>
									Revitalize your bodycare routine with our
									curated selection of products. Our range
									includes top brands known for their
									effective and indulgent bodycare solutions.
									Experience the difference with rich body
									butters, exfoliating scrubs, and refreshing
									body washes that leave your skin feeling
									rejuvenated and pampered. Whether you're
									looking to hydrate, firm, or simply indulge,
									our collection has something for everyone.
									Start your journey to better bodycare today.
								</p>
							</div>
						</div>
						<div className="image-container">
							<img
								src="https://i.ibb.co/9bDWv9k/bodycare.png"
								alt="Slide 2"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="slide-content">
						<div className="text-content">
							<div className="title" data-swiper-parallax="-300">
								HAIR CARE Slide 3
							</div>
							<div className="text" data-swiper-parallax="-100">
								<p>
									Discover the best in haircare with our
									selection of premium products from top
									brands. Whether you're looking to repair
									damaged hair, boost volume, or maintain a
									sleek, shiny look, we have the perfect
									solution. Our range includes nourishing
									shampoos, conditioners, and treatments that
									cater to all hair types and needs.
									Experience the transformative power of
									quality haircare and achieve the luscious
									locks you've always wanted. Shop now and
									give your hair the care it deserves.
								</p>
							</div>
						</div>
						<div className="image-container">
							<img
								src="https://i.ibb.co/rQxG6HX/haircare.png"
								alt="Slide 3"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="slide-content">
						<div className="text-content">
							<div className="title" data-swiper-parallax="-300">
								ACCESSOIRES Slide 4
							</div>
							<div className="text" data-swiper-parallax="-100">
								<p>
									Elevate your skincare game with our
									exclusive selection of products from
									renowned brands. Whether you're battling
									dryness, seeking anti-aging remedies, or
									just looking for a new daily regimen, we
									have the perfect solutions. Our inventory
									includes everything from rich moisturizers
									and soothing toners to potent serums and
									exfoliants. Pamper your skin with the best
									in the market and see visible improvements.
									Start your journey to flawless skin today by
									exploring our wide range of skincare
									essentials.
								</p>
							</div>
						</div>
						<div className="image-container">
							<img
								src="https://i.ibb.co/cTb4KMf/accessoires.png"
								alt="Slide 4"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="slide-content">
						<div className="text-content">
							<div className="title" data-swiper-parallax="-300">
								OUR BOXES Slide 5
							</div>
							<div className="text" data-swiper-parallax="-100">
								<p>
									Discover the joy of unboxing with our
									exclusive surprise boxes. Each box is
									carefully curated to offer you a selection
									of high-quality products. Whether you're
									treating yourself or looking for a gift, our
									boxes are perfect for any occasion. They
									include an exciting mix of beauty products,
									lifestyle accessories, and more. Let
									yourself be surprised by our unique
									creations and enjoy the thrill of the
									unknown. Order your surprise box now and
									experience the delight of discovering new
									favorite products!
								</p>
							</div>
						</div>
						<div className="image-container">
							<img
								src="https://i.ibb.co/cTb4KMf/accessoires.png"
								alt="Slide 5"
							/>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="slide-content">
						<div className="text-content">
							<div className="title" data-swiper-parallax="-300">
								SKIN CONCERNS Slide 6
							</div>
							<div className="text" data-swiper-parallax="-100">
								<p>
									Elevate your skincare game with our
									exclusive range of products tailored for
									specific skincare concerns. Whether you're
									battling acne, looking for solutions for
									hyperpigmentation, or seeking effective
									anti-aging treatments, we have the perfect
									products for you. Our inventory features
									everything from gentle cleansers and
									targeted treatments to nourishing serums and
									healing masks. Each product is formulated
									with high-quality ingredients to address
									your unique needs. Experience the difference
									and achieve healthier, more radiant skin.
									Start your journey to addressing your
									skincare concerns today by exploring our
									specialized skincare collections.
								</p>
							</div>
						</div>
						<div className="image-container">
							<img
								src="https://i.ibb.co/cTb4KMf/accessoires.png"
								alt="Slide 6"
							/>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</>
	);
};

export default Slider;
