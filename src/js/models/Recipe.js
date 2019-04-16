import axios from "axios";
import {apiKeys, proxy} from "../config";

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
                console.log(`API KEY : [${key}] ${text} `);

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

    parseIngredients(){
      const unitsLong = ["tablespoons","tablespoon","ounces","ounce","teaspoons","teaspoon","cups","pounds"];
      const unitsShort = ["tbsp","tbsp","oz","oz","tsp","tsp","cup","pound"];

      
      const newIngredients = this.ingredients.map(el => {
        //1. Uniform Units
        let ingredient = el.toLowerCase();
        unitsLong.forEach((unit, i) => {
          ingredient = ingredient.replace(unit, unitsShort[i]);
        });
   
        //2. Remove Parentheses
        ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

        //3. Parse Ingredients into count ,unit and ingredient
        const arrIng = ingredient.split(" ");
        const unitIndex = arrIng.findIndex(el2 =>
          unitsShort.includes(el2)
        );

        
        let objIngredient;
        if(unitIndex>-1){ //It found an element

              // EX. 4 1/2 cups , arrCount is [4,1/2]
             // EX. 4 cups , arrCount is [4]
            const arrCount = arrIng.slice(0,unitIndex);

            let count;
            if(arrCount.length  === 1){
                count = eval(arrIng[0].replace("-","+"))
            }else{
                count = eval(arrIng.slice(0,unitIndex).join("+"))
            }

            objIngredient = {
              count,
              unit: arrIng[unitIndex],
              ingredient: arrIng.slice(unitIndex + 1).join(" ")
            };
        }else if(parseInt(arrIng[0],10)){ //There is no unit but the 1st element is number
            objIngredient = {
              count: parseInt(arrIng[0], 10),
              unit: " ",
              ingredient: arrIng.slice(1).join(" ")
            };
        }else if(unitIndex === -1){  //There is no unit and no number in first position
            objIngredient = {
              count: 1,
              unit: " ",
              ingredient
            };
        }   

        return objIngredient;
      });

      this.ingredients = newIngredients;
    }
}

export default Recipe;
