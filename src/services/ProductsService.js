import axios from "axios";

const baseUrl = "http://localhost:3000/products/v2.0/";

const getProducts = async () => {
	return await axios.get(baseUrl + "products").catch((err) => {
		throw new Error(err);
	});
};

const getCategories = async () => {
	return await axios.get(baseUrl + "categories").catch((err) => {
		throw new Error(err);
	});
};

const ProductsService = {
	getProducts,
	getCategories,
};

export default ProductsService;
