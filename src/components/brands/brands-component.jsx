import React, { Fragment, useState, useEffect } from "react";
import { getBrands } from "../../utils/firebase/firebase.utils";
import "./brands.styles.scss";

const BrandsComponent = () => {
	const [brands, setBrands] = useState([]);

	useEffect(() => {
		const fetchBrands = async () => {
			const brandsData = await getBrands();
			setBrands(brandsData);
		};

		fetchBrands();
	}, []);

	return (
		<Fragment>
			<section className="text-brands-container">
				<div className="left-text-container">
					<h1 className="wavy-underline">Variety of brands</h1>
					<p>
						We understand that everyone's skin is unique, which is
						why we offer a wide variety of products across different
						categories. From luxurious serums and effective
						cleansers to soothing moisturizers and rejuvenating
						masks, our collection is designed to help you achieve
						your skincare goals. Enjoy shopping.
					</p>
				</div>

				<div className="brands-container">
					{brands.map((brand) => (
						<div className="brand-box" key={brand.id}>
							<img
								className="brand-img"
								src={brand.imageUrl}
								alt={brand.name}
							/>
						</div>
					))}
				</div>
			</section>
		</Fragment>
	);
};

export default BrandsComponent;
