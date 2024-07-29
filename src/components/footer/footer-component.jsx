import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { Twitter, Facebook, Instagram } from "lucide-react";

import { ReactComponent as SkincareLogo } from "../../assets/skincare-logo1-transp.svg";
//import { ReactComponent as SkincareLogo } from "../../assets/crown.svg";

import "./footer.styles.scss";

// https://www.w3schools.com/spaces/index.php used this websites styles and copied

const Footer = () => {
	return (
		<div id="main-content">
			<div className="footer-container">
				<div className="svg-container">
					<svg
						viewBox="0 0 5950 410"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{ display: "block" }}>
						<path
							className="path-comp"
							fillRule="evenodd"
							clipRule="evenodd"
							d="M141.726 45.4514L0 0V409.063H140.486H851.18H1698.23H2549.41H3400.59H4251.77H5098.82H5950V189.243C5938.41 191.46 5926.82 193.683 5915.25 195.905C5642.01 248.332 5371.94 300.154 5098.82 265.271C4981.35 249.378 4863.23 216.296 4744.97 183.176C4580.38 137.076 4415.51 90.9028 4251.77 90.9028C4061.21 90.9028 3871.39 151.819 3682.05 212.577C3588.12 242.721 3494.31 272.826 3400.59 295.434C3115.49 363.611 2833.27 363.611 2549.41 318.16C2445.26 301.311 2340.53 278.217 2235.46 255.045C2057.07 215.705 1877.65 176.138 1698.23 166.517C1557.84 159.704 1416.73 170.738 1275.46 181.783C1134 192.843 992.382 203.916 851.18 197.094C567.058 181.858 285.398 91.5281 143.195 45.9227L141.726 45.4514Z"
							fill="#04AA6D"></path>
					</svg>
				</div>

				<div className="footer-content green">
					<div className="logo-section">
						<Link to="/">
							<SkincareLogo className="logo" />
						</Link>
						<p>© 2024 Aylin</p>
					</div>

					<section className="link-section">
						<h4>Section</h4>
						<ul>
							<li>Home</li>
							<li>Features</li>
							<li>Pricing</li>
							<li>FAQs</li>
							<li>About</li>
						</ul>
					</section>
					<section className="link-section">
						<h4>Section</h4>
						<ul>
							<li>Home</li>
							<li>Features</li>
							<li>Pricing</li>
							<li>FAQs</li>
							<li>About</li>
						</ul>
					</section>
					<section className="link-section">
						<h4>Section</h4>
						<ul>
							<li>Home</li>
							<li>Features</li>
							<li>Pricing</li>
							<li>FAQs</li>
							<li>About</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Footer;
