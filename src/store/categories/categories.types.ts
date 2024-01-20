export enum CATEGORIES_ACTION_TYPES {
	FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
	FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
	FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED",
}

export type CategoriesItem = {
	id: number;
	imageUrl: string;
	name: string;
	price: number;
};

export type Categories = {
	title: string;
	imageUrl: string;
	items: CategoriesItem[];
};

export type CategoriesMap = {
	[key: string]: CategoriesItem[];
};
