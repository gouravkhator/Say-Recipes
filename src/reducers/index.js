import { combineReducers } from "redux";
import globalReducer from "./global.reducer";
import recipesReducer from "./recipes.reducer";

export default combineReducers({
  recipes: recipesReducer,
  global: globalReducer,
});
