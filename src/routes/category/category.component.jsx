import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import Slider from "../../components/routes-slider/routes-slider.component";

import {
	selectCategories,
	selectCategoriesMap,
	selectIsLoading,
	selectFilteredProducts,
} from "../../store/categories/categories.selector";

import { fetchProductsBySubCategoryStart } from "../../store/categories/categories.action";

//import { CategoryContainer, Title } from "./category.styles";
import "./category.styles.scss";

const Category = () => {
	const { category, subcategory } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsLoading);
	const [products, setProducts] = useState(categoriesMap[category] || []); //categoriesMap[category] ||

	// TODO useEffect
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const filteredProducts = useSelector(selectFilteredProducts);

	useEffect(() => {
		if (category && subcategory) {
			const subcategories = subcategory.split(",");
			dispatch(fetchProductsBySubCategoryStart(category, subcategories));
		} else if (category) {
			setProducts(categoriesMap[category] || []);
		} else {
			// Wenn weder category noch subcategory vorhanden sind, alle Produkte laden
			const allProducts = categories.flatMap((cat) => cat.items);
			setProducts(allProducts);
		}
	}, [category, subcategory, categoriesMap, categories, dispatch]);

	useEffect(() => {
		if (subcategory) {
			console.log(
				"Gefilterte Produkte in der Komponente:",
				filteredProducts
			);
			setProducts(filteredProducts);
		} else if (category) {
			setProducts(categoriesMap[category] || []);
		}
	}, [filteredProducts, subcategory, category, categoriesMap]);

	useEffect(() => {
		console.log("Products in state:", products);
	}, [products]);

	// useEffect(() => {
	// 	if (subcategory) {
	// 		// Fetch products based on subcategory
	// 		dispatch(
	// 			fetchProductsBySubCategoryStart({ category, subcategory })
	// 		);
	// 	} else {
	// 		// This maintains the previous functionality
	// 		setProducts(categoriesMap[category]);
	// 	}
	// }, [category, subcategory, categoriesMap, dispatch]);
	// TODO END

	useEffect(() => {
		// Log current categories and products
		console.log(
			"Categories in Redux store after data loading:",
			categoriesMap
		);
		console.log("Products for the category:", categoriesMap[category]);
	}, [category, categoriesMap]);

	useEffect(() => {
		console.log(
			"Kategorien im Redux-Store nach Datenladung:",
			categoriesMap
		);
		console.log("Produkte für die Kategorie:", categoriesMap[category]);
		if (categoriesMap[category]) {
			setProducts(categoriesMap[category]);
		}
	}, [category, categoriesMap]);

	// Bestimme den Startindex basierend auf der Route
	const getStartIndex = () => {
		if (category === "skincare") return 0;
		if (category === "bodycare") return 1;
		if (category === "haircare") return 2;
		if (category === "accessoires") return 3;
		// Füge weitere Routen und entsprechende Indizes hinzu
		return 0;
	};

	/*
	<h2 className="category-title">{category.toUpperCase()}</h2>
			<h2 className="category-title">{`${category.toUpperCase()} - ${subcategory.toUpperCase()}`}</h2>
	 */
	return (
		<Fragment>
			<h2 className="category-title">
				{subcategory
					? `${category.toUpperCase()} - ${subcategory.toUpperCase()}`
					: category.toUpperCase()}
			</h2>
			<Slider
				key={`${category}-${subcategory}`}
				startIndex={getStartIndex()}
			/>

			{isLoading ? (
				<Spinner />
			) : (
				<div className="category-container">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
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
