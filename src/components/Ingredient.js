import React from "react";
import "./Recipes.css";
import { setError, setRecipe } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const renderLoader = () => {
  return <div className="loading">Loading..</div>;
};

const getData = async (itemNameParam) => {
  // using netlify serverless function, with the query param passed as recipe_name
  const res = await fetch(
    "/.netlify/functions/fetch_recipe_data?recipe_name=" + itemNameParam
  );

  const response_data = await res.json();

  if (!response_data?.recipe_data) {
    throw new Error("Cannot load the recipe data..");
  }

  const recipe_data = response_data.recipe_data;
  return recipe_data.hits[0].recipe;
};

function Ingredient() {
  let recipe = useSelector(({ recipes }) => recipes.currentRecipe);
  const { itemNameParam } = useParams();
  let dispatch = useDispatch();

  if (Object.keys(recipe).length === 0) {
    getData(itemNameParam)
      .then((data) => {
        dispatch(
          setRecipe({
            currentRecipe: { ...data },
            searchedRecipe: itemNameParam,
          })
        );
      })
      .catch(() => {
        dispatch(setError("Failed loading current recipes' data..."));
      });
  }

  return (
    <div className="IngredientPage">
      {Object.keys(recipe).length === 0 ? (
        renderLoader()
      ) : (
        <>
          <div className="image">
            <h2>{recipe.label}</h2>
            <img src={recipe.image} alt="..." />
          </div>
          <div className="list">
            <h2>Ingredients Required</h2>
            <ul className="ingredients">
              {recipe.ingredients.map((value) => (
                <li className="ingredientItem" key={Math.random()}>
                  {value.text}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Ingredient;
