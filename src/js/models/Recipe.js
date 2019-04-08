import axios from "axios";
import { apiKeys, proxy } from "../config";

class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      let working = false;
      let counter = 0;

      //Loop until a working API KEY
      while (!working) {
        const key = apiKeys[counter];
        const result = await axios.get(
          `${proxy}/api/get?key=${key}&rId=${this.id}`
        );

        let recipe = result.data.recipe;
        this.title = recipe.title;
        this.author = recipe.publisher;
        this.img = recipe.image_url;
        this.url = recipe.source_url;
        this.ingredients = recipe.ingredients;

        this.error = result.data.error;

        //Check if working
        working = this.error === undefined;
        let text = !working ? "not working!" : "works like charm!!";
        if (working) {
          this.calculateTime();
          this.calcServings();
        }
        console.log(`API KEY : [${key}] ${text} `);

        //Stop on maximum array elements
        if (apiKeys[counter + 1] !== undefined) counter++;
        else break;
      }
    } catch (e) {
      alert(`Error : ${e}`);
    }
  }

  calculateTime() {
    const numberOfIngredients = this.ingredients.length;
    const periods = Math.ceil(numberOfIngredients / 3);

    this.time = periods * 15;

    console.log(this.time);
  }

  calcServings() {
    this.servings = 4;
  }
}

export default Recipe;
