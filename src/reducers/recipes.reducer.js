import { recipesActions } from "../actions/index";

const initialState = {
  currentRecipe: {},
  searchedRecipe: "pasta",
};

const recipesReducer = (state = initialState, action) => {
  if (action.type === recipesActions.SET_RECIPE) {
    return {
      ...state,
      currentRecipe: { ...action.currentRecipe },
      searchedRecipe: action.searchedRecipe,
    };
  }

  return { ...state };
};

export default recipesReducer;
