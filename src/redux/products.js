import undoable from "redux-undo";

// Initial state
const initialState = {
	products: [],
	defaultProducts: [],
};

// Type
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_DEFAULT = "SET_DEFAULT";

// Action
export const setProducts = (products) => ({
	type: SET_PRODUCTS,
	payload: products,
});

export const setDefault = (defaultProducts) => ({
	type: SET_DEFAULT,
	payload: defaultProducts,
});

// Reducer
const products = (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCTS: {
			return {
				...state,
				products: action.payload,
			};
		}
		case SET_DEFAULT: {
			return {
				...state,
				defaultProducts: action.payload,
			};
		}
		default:
			return state;
	}
};

export default products;
