import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";

import "./shop.style.scss";

const Shop = () => {
	const { products } = useContext(ProductsContext);

	return (
		<div className="product-card-container">
			{products.map((product) => (
				/*<div key={id}>
					<h1>{name}</h1>
				</div>*/
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default Shop;
