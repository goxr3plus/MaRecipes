import axios from "axios";

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const key = `d9a51595a52bdef87baae0b18c22e2ac`;
    return axios
      .get(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
      .then(res => {
        this.results = res.data.recipes;
      })
      .catch(err => {
        alert(`Some kind of error happened :'( \n ${err}`);
      });
  }
}

export default Search;
