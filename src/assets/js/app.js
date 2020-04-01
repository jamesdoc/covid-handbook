const data = require("../../_data/dev/sheet.json");

window.store = function() {
  return {
    sections: [],
    items: [],
    query: null,

    filteredItems() {
      if (!this.query) return [];
      return this.items.filter(s => s.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    },

    tags(item) {
      if (item.tags && !item.tags[0]) return "";
      return item.tags.join(", ");
    },

    init() {
      Object.entries(data).forEach(([key, value]) => {
        this.sections.push(key);
        for (let item of value) {
          this.items.push(item);
        }
      });

      //   this.sections.forEach(s => console.log(s));
      //   this.items.forEach(s => console.log(s.title));
      //   console.log(window.data["Starters Guide"][0].title);
    }
  };
};
