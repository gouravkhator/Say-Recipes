import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setError, setRecipe } from "../actions";
import "./Recipes.css";
import Search from "./Search";

const Items = lazy(() => import("./Items"));

const renderLoader = () => {
  return <div className="loading">Loading..</div>;
};

const getData = async (searchedItem, veg, setRecipeArr) => {
  const res = await fetch(
    "/.netlify/functions/fetch_recipe_data?recipe_name=" + searchedItem
  );

  const response_data = await res.json();

  if (!response_data?.recipe_data) {
    throw new Error("Cannot load the recipe data..");
  }

  const recipe_data = response_data.recipe_data;

  let temp;

  if (veg === true) {
    temp = recipe_data.hits.filter((value) => {
      const healthLabels = [...value.recipe.healthLabels];
      return healthLabels.findIndex((value1) => value1 === "Vegetarian") !== -1;
    });
  } else {
    temp = recipe_data.hits.filter((value) => {
      const healthLabels = [...value.recipe.healthLabels];
      return healthLabels.findIndex((value1) => value1 === "Vegetarian") === -1;
    });
  }
  setRecipeArr(temp);
};

function Recipes() {
  const dispatch = useDispatch();
  const savedSearch = useSelector(({ recipes }) => recipes.searchedRecipe);
  const [searchedValue, setSearchedValue] = useState(savedSearch);
  const [mainSearched, setMainSearched] = useState(searchedValue);
  const [veg, setVeg] = useState(true);
  const [recipeArr, setRecipeArr] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        await getData(mainSearched, veg, setRecipeArr);
      } catch (err) {
        dispatch(setError("Failed loading recipes' data"));
      }
    })();
  }, [mainSearched, veg]);

  const searchFunction = (e) => {
    setSearchedValue(e.target.value);
  };

  const handleVegEvent = (e) => {
    setVeg(e.target.checked);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32 || e.keyCode === 13) {
      setMainSearched(searchedValue);
    }
  };

  const handleIngredientClick = (recipe) => {
    dispatch(
      setRecipe({
        currentRecipe: { ...recipe },
        searchedRecipe: mainSearched,
      })
    );
  };

  return (
    <div className="Recipes">
      <Search
        handleSearch={(e) => searchFunction(e)}
        handleVeg={(e) => handleVegEvent(e)}
        checkedValue={veg}
        keyDown={(e) => handleKeyDown(e)}
      />

      <Suspense fallback={renderLoader()}>
        <Items
          recipeArr={recipeArr}
          handleIngredientClick={handleIngredientClick}
        />
      </Suspense>
    </div>
  );
}

export default Recipes;
