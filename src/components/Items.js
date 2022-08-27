import React from "react";
import { Link } from "react-router-dom";

export default function Items({ recipeArr, handleIngredientClick }) {
  return (
    <>
      <ul className="recipeList">
        {recipeArr.length !== 0 &&
          recipeArr.map(({ recipe }) => {
            return (
              <li key={recipe.label} className="recipeItem">
                <Link
                  to={"/ingredients/" + recipe.label}
                  onClick={() => handleIngredientClick(recipe)}
                >
                  <h3 className="item-name">{recipe.label}</h3>
                  <img src={recipe.image} alt="..." />
                  <p>Calories : {recipe.calories.toFixed(2)}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
