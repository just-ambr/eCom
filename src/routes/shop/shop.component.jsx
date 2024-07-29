import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { fetchCategoriesStart } from "../../store/categories/categories.action";

import "./shop.styles.scss";

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoriesStart());
	}, [dispatch]);

	return (
		<div className="shop-container">
			<Routes>
				<Route index element={<CategoriesPreview />} />
				<Route path=":category" element={<Category />} />
				<Route path=":category/:subcategory" element={<Category />} />
			</Routes>
		</div>
	);
};

export default Shop;

//				<Route path=":category" element={<Category />} />
