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
        let url = `${proxy}/api/get?key=${key}&rId=${this.id}`;
        const result = await axios.get(url);

        this.error = result.data.error;

        //Check if working
        working = this.error === undefined;
        let text = !working ? "not working!" : "works like charm!!";
        if (working) {
          let recipe = result.data.recipe;
          this.title = recipe.title;
          this.author = recipe.publisher;
          this.img = recipe.image_url;
          this.url = recipe.source_url;
          this.ingredients = recipe.ingredients;

          this.calculateTime();
          this.calcServings();
        }
        //console.log(`API KEY : [${key}] ${text} `);

        //Stop on maximum array elements
        if (apiKeys[counter + 1] !== undefined) counter++;
        else break;
      }
    } catch (e) {
      console.log(`Error : ${e}`);
      this.error = e;
    }
  }

  calculateTime() {
    const numberOfIngredients = this.ingredients.length;
    const periods = Math.ceil(numberOfIngredients / 3);

    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}

export default Recipe;
