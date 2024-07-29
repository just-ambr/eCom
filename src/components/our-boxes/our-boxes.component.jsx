import React, { useState, useEffect } from "react";
import { getOurBoxes } from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";

import "./our-boxes.styles.scss";

const Box = ({ imageSrc, imageAlt, title, description }) => {
	return (
		<div className="box-sld-cont">
			<div className="box-content">
				<div className="img-container">
					<img
						className="img-slider-img"
						src={imageSrc}
						alt={imageAlt}
					/>
				</div>

				<div className="box-info">
					<h3>{title}</h3>
					<p>{description}</p>
					<Button buttonType="inverted">
						Add to cart OR Link to Route?
					</Button>
				</div>
			</div>
		</div>
	);
};

const OurBoxes = () => {
	const [boxes, setBoxes] = useState([]);

	useEffect(() => {
		const fetchBoxes = async () => {
			const boxData = await getOurBoxes();
			setBoxes(boxData);
		};

		fetchBoxes();
	}, []);

	return (
		<section className="box-container">
			<div className="box-header">
				<h2>Buy</h2>
				<h1>Our Boxes</h1>
			</div>
			{boxes.map((box, index) => (
				<Box
					key={index}
					imageSrc={box.imageUrl}
					imageAlt={box.name}
					title={box.name}
					description={box.description}
				/>
			))}
		</section>
	);
};

export default OurBoxes;
