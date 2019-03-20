import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

/**
 * Global State of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
  //Get query from view
  const query = searchView.getInput();

  if (query) {
    console.log("Entered");
    //New search object and add to state
    state.search = new Search(query);

    //Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();

    //Search for Recipes
    await state.search.getResults();

    //Render results on UI
    searchView.renderResults(state.search.results);
  }
  console.log(query);
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
