import { elements, clearLoader } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => (elements.searchInput.value = "");
export const clearResults = () => (elements.searchResList.innerHTML = "");
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

export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
