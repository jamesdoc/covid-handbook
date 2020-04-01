const data = require("../../_data/dev/sheet.json");

window.store = function() {
  return {
    navDisplayed: false,
    sections: [],
    items: [],
    query: null,

    filteredSections() {
      if (!this.query) return [];

      let collected = this.sections.map(s => {
        return {
          name: s,
          items: this.sectionItems(s)
        };
      });

      return collected;
    },

    sectionItems(section) {
      if (!this.query) return [];
      return this.filteredItems().filter(s => s.section == section);
    },

    filteredItems() {
      if (!this.query) return [];
      return this.items.filter(s => s.title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1);
    },

    tags(item) {
      if (item.tags && !item.tags[0]) return "";
      return item.tags.join(", ");
    },

    slugify(string) {
      const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
      const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
      const p = new RegExp(a.split("").join("|"), "g");

      return string
        .toString()
        .toLowerCase()
        .replace(/\/+/g, "") // nunjucks quirk: remove slashes
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
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

/*

      let test = [
        { in: "Apps, Software & Other Useful Tools", out: "apps-software-and-other-useful-tools" },
        { in: "Live", out: "live" },
        { in: "Copyright/Music Licensing", out: "copyrightmusic-licensing" }
      ];

      let that = this;
      test.forEach(t => {
        console.log(this.slugify(t.in));
        console.log(t.out == that.slugify(t.in) ? "pass" : "fail");
      });
*/
