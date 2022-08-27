const axios = require("axios");

async function fetch_recipe_data(event, context) {
  try {
    const recipe_name = event.queryStringParameters.recipe_name || "pasta";

    const app_id = process.env.EDAMAM_APP_ID,
      app_key = process.env.EDAMAM_APP_KEY;

    const url = `https://api.edamam.com/search?q=${recipe_name}&app_id=${app_id}&app_key=${app_key}`;

    const res = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe_data: res.data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error_msg: "Failed to fetch recipes' data from the API",
      }),
    };
  }
}

exports.handler = fetch_recipe_data;
