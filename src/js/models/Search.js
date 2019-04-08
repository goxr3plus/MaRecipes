import axios from "axios";
import { apiKeys, proxy } from "../config";

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(counter = 0) {
    try {
      let working = false;

      //Loop until a working API KEY
      while (!working) {
        const key = apiKeys[counter];
        const result = await axios.get(
          `${proxy}/api/search?key=${key}&q=${this.query}`
        );

        this.results = result.data.recipes;
        this.error = result.data.error;

        //Check if working
        working = this.error === undefined;
        let text = !working ? "not working!" : "works like charm!!";
        //console.log(`API KEY : [${key}] ${text} `);

        //Stop on maximum array elements
        if (apiKeys[counter + 1] !== undefined) counter++;
        else break;
      }
    } catch (e) {
      alert(`Error : ${e}`);
    }
  }
}

export default Search;
