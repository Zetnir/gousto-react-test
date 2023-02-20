import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import products from "./products";
import categories from "./categories";

export default (history) =>
	combineReducers({
		router: connectRouter(history),
		products,
		categories,
	});
