import React from 'react';
import './Recipes.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const renderLoader = () => {
    return (
        <div className="loading">
            Loading..
        </div>
    );
}

const getData = async (itemNameParam) => {
    const app_id = process.env.REACT_APP_EDAMAM_APP_ID, app_key = process.env.REACT_APP_EDAMAM_APP_KEY;
    let url = `https://api.edamam.com/search?q=${itemNameParam}&app_id=${app_id}&app_key=${app_key}`;

    const res = await fetch(url);
    const data = await res.json();

    return data.hits[0].recipe;
}

function Ingredient() {
    let recipe = useSelector(state => state.currentRecipe);
    const { itemNameParam } = useParams();
    let dispatch = useDispatch();

    if (Object.keys(recipe).length === 0) {
        getData(itemNameParam).then((data) => {
            dispatch({ type: 'SET_RECIPE', currentRecipe: { ...data }, searched: itemNameParam });
        });
    }

    return (
        <div className="IngredientPage">
            {Object.keys(recipe).length === 0 ? renderLoader() :
                <>
                    <div className="image">
                        <h2>{recipe.label}</h2>
                        <img src={recipe.image} alt="..." />
                    </div>
                    <div className="list">
                        <h2>Ingredients Required</h2>
                        <ul className="ingredients">
                            {recipe.ingredients.map((value) => (
                                <li className="ingredientItem" key={Math.random()}>{value.text}</li>
                            ))}
                        </ul>
                    </div>
                </>
            }
        </div >
    );
}

export default Ingredient;