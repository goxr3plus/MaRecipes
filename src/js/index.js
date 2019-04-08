import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";
import Recipe from "./models/Recipe";
import { resolve } from "url";

/**
 * Global State of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  //Get query from view
  const query = searchView.getInput();

  if (query) {
    //New search object and add to state
    state.search = new Search(query);

    //Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.results);

    //Search for Recipes
    await state.search.getResults();

    //Check for API LIMIT
    if (state.search.error) {
      clearLoader();
      alert("Maximum API Limit reached!");
      return;
    }

    //Render results on UI
    clearLoader();
    searchView.renderResults(state.search.results);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.resultsPages.addEventListener("click", e => {
  const button = e.target.closest(".btn-inline");
  if (button) {
    const goToPage = parseInt(button.getAttribute("goto"));
    searchView.clearResults();
    searchView.renderResults(state.search.results, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
// const recipe = new Recipe(46956);
// recipe.getRecipe().then(resolve=>{
//   console.log(recipe)
// })

const controlRecipe = () => {
  const id = window.location.hash;

  console.log(window);
}

window.addEventListener("hashchange",controlRecipe)