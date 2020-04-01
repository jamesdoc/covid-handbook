const data = require("../../_data/dev/sheet.json");

window.store = function() {
  return {
    sections: [],
    items: [],
    query: null,

    init() {
      Object.entries(data).forEach(([key, value]) => {
        this.sections.push(key);
        console.log(value);
      });

      this.sections.forEach(s => console.log(s));
      //   console.log(window.data["Starters Guide"][0].title);
    }
  };
};
