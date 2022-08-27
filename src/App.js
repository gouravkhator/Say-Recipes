import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Recipes from "./components/Recipes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import About from "./components/About";
import Contact from "./components/Contact";
import Ingredient from "./components/Ingredient";

function App() {
  const error_msg = useSelector(({ global }) => global.errorMsg);

  return (
    <Router>
      <div className="App">
        <Nav />

        {error_msg && error_msg !== "" && (
          <h2 className="error-msg">{error_msg}</h2>
        )}

        <Route path="/" exact component={Recipes} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route
          path="/ingredients/:itemNameParam"
          exact
          component={Ingredient}
        />
      </div>
    </Router>
  );
}

export default App;
