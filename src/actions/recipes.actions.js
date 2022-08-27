// ? NOTE: we use Object.freeze so that these actions cannot be changed anywhere..

export const recipesActions = Object.freeze({
  SET_RECIPE: "SET_RECIPE",
});

/*-----Action Object generator functions----- */
export const setRecipe = ({ currentRecipe, searchedRecipe }) => {
  return {
    type: recipesActions.SET_RECIPE,
    currentRecipe,
    searchedRecipe,
  };
};
