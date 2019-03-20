import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

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
    //New search object and add to state
    state.search = new Search(query);

    //Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.results);

    //Search for Recipes
    await state.search.getResults();

    //Render results on UI
    clearLoader();
    searchView.renderResults(state.search.results);
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
