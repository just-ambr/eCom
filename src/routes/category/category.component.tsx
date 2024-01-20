import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import {
	selectCategoriesMap,
	selectIsLoading,
} from "../../store/categories/categories.selector";
import { CategoryContainer, Title } from "./category.styles";

type CategoryRouteParams = {
	category: string;
};

const Category = () => {
	const { category } = useParams<
		keyof CategoryRouteParams
	>() as CategoryRouteParams;
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsLoading);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<Fragment>
			<Title>{category.toUpperCase()}</Title>
			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</CategoryContainer>
			)}
		</Fragment>
	);
};

export default Category;

/*
import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import "./category.styles.scss";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<Fragment>
			<h2 className="category-title">{category.toUpperCase()}</h2>
			<div className="category-container">
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</Fragment>
	);
};

export default Category; */
