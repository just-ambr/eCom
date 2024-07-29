// netlify/functions/updateImages.js
require("dotenv").config();
const fetch = require("node-fetch");

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_ENDPOINT = `https://api.unsplash.com/search/photos`;
const PER_PAGE = 30; // Die Anzahl der Bilder, die du abrufen möchtest (max 30).

exports.handler = async (event) => {
	try {
		const { searchTerm } = JSON.parse(event.body);
		const response = await fetch(
			`${UNSPLASH_ENDPOINT}?query=${encodeURIComponent(
				searchTerm
			)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=${PER_PAGE}`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const imageUrls = data.results.map((img) => img.urls.regular);

		return {
			statusCode: 200,
			body: JSON.stringify({ imageUrls }),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: error.statusCode || 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};
