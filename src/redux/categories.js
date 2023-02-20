// Initial state
const initialState = {
	categories: [],
};

// Type
const SET_CATEGORIES = "SET_CATEGORIES";

// Action
export const setCategories = (categories) => ({
	type: SET_CATEGORIES,
	payload: categories,
});

// Reducer
const categories = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORIES: {
			return {
				...state,
				categories: action.payload,
			};
		}
		default:
			return state;
	}
};

export default categories;
