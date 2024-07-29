import DirectoryItem from "../directory-item/directory-item-component";

//import { DirectoryContainer } from "./directory.styles";
import "./directory.styles.scss";

export const categories = [
	{
		id: 1,
		title: "SKINCARE",
		//imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
		imageUrl:
			"https://images.unsplash.com/photo-1517498327491-f903e1e281cd?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		route: "shop/skincare",
	},
	{
		id: 2,
		title: "BODYCARE",
		imageUrl:
			"https://images.unsplash.com/photo-1523459178261-028135da2714?q=80&w=2932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		route: "shop/bodycare",
	},
	{
		id: 3,
		title: "HAIRCARE",
		imageUrl:
			"https://images.unsplash.com/photo-1574621100236-d25b64cfd647?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		route: "shop/haircare",
	},
	{
		id: 4,
		title: "ACCESSOIRES",
		imageUrl:
			"https://images.unsplash.com/photo-1531166970740-9c3f74ffc420?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		route: "shop/skinconcerns",
	},
	{
		id: 5,
		title: "OUR BOXES",
		imageUrl:
			"https://images.unsplash.com/photo-1608145264900-e9905d0d6de8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		route: "shop/boxes",
	},
	{
		id: 6,
		title: "6th added for test",
		imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
		route: "shop/mens",
	},
];

const Directory = () => {
	return (
		//slice for just showing 5 categories .slice(0, 5)
		<div className="directory-container">
			{categories.slice(0, 5).map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Directory;

/*
import DirectoryItem from "../directory-item/directory-item-component";

import "./directory.styles.scss";

const Directory = ({ categories }) => {
	return (
		<div className="directory-container">
			{categories.map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Directory;
*/
