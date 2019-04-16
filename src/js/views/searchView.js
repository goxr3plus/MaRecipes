import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => (elements.searchInput.value = "");
export const clearResults = () => {
  elements.searchResList.innerHTML = "";
  elements.resultsPages.innerHTML = "";
};
const limitRecipeTitle = (title, limit = 17) => {
  // if (title.length > limit) {
  //   const newTitle = [];
  //   title.split(" ").reduce((accumulator, current) => {
  //     //Check if length < limit
  //     if (accumulator + current.length < limit) {
  //       newTitle.push(current);
  //     }
  //     accumulator = accumulator + current.length;
  //   }, 0);
  //   return `${newTitle.join(" ")} ...`;
  // } else
  return title;
};

const renderRecipe = recipe => {
  const markup = `
                 <li>
                   <a class="results__link" href="#${recipe.recipe_id}">
                       <figure class="results__fig">
                           <img src="${recipe.image_url}" alt="${recipe.title}">
                       </figure>
                       <div class="results__data">
                           <h4 class="results__name">${limitRecipeTitle(
                             recipe.title
                           )}</h4>
                           <p class="results__author">${recipe.publisher}{</p>
                       </div>
                   </a>
                 </li>
                 `;

  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

//type: `prev` or `next`
const createButton = (page, type) =>
  `<button class="btn-inline results__btn--${type}" goto=${type === 'prev' ? page - 1 : page + 1}>
      <span>Page ${type == "prev" ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${ type === "prev" ? "left" : "right"}"></use>
      </svg>
  </button>
  `;

const renderButtons = (page,numResults,resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    //Only button to go to next page
    button = createButton(page,"next")
  } else if (page < pages) {
    //Both buttons
    button = `${createButton(page,"prev")}
              ${createButton(page,"next")}
             `
  } else if (page === pages && pages > 1) {
    //only button to go to prev pages
    button = createButton(page,"prev")
  }

  if(button !== undefined)
   elements.resultsPages.insertAdjacentHTML("afterBegin",button)
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const stop = page * resPerPage;
  recipes.slice(start, stop).forEach(renderRecipe);
  renderButtons(page,recipes.length,resPerPage);
};
