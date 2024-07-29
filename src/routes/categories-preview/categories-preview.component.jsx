import { Fragment } from "react";
import { useSelector } from "react-redux";

import {
	selectCategoriesMap,
	selectIsLoading,
} from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import Slider from "../../components/routes-slider/routes-slider.component";

const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectIsLoading);

	console.log("Categories map in CategoriesPreview:", categoriesMap);

	return (
		<Fragment>
			<h2>categories-preview.component</h2>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((title) => {
					const products = categoriesMap[title];
					return (
						<CategoryPreview
							key={title}
							title={title}
							products={products}
						/>
					);
				})
			)}
		</Fragment>
	);
};

export default CategoriesPreview;
