// import { shareResource } from './resourceActions';

const data = require("../../_data/dev/sheet.json");
var throttle = require("lodash.throttle");

window.store = function() {
  return {
    mainNavLinks: [],
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

    onScroll() {
      let fromTop = window.scrollY;

      this.mainNavLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
          link.classList.add("sectionNav__link__tracking");
        } else {
          link.classList.remove("sectionNav__link__tracking");
        }
      });
    },

    shareResource(ev) {
      const el = ev.target; // Careful, might be the SVG, not the <button>
      const shareSheet = el.closest(".resource").querySelector(".shareSheet");
      shareSheet.classList.toggle("shareSheet--open");

      // Toggle the icon
      const iconParent = el.closest(".resource__actions__btn");
      const svgXLink = "http://www.w3.org/1999/xlink";
      const svgUse = iconParent.querySelector(".resource__icon__use");
      console.log(svgUse);
      let icon = svgUse.getAttribute("xlink:href").split("#");
      const svgSpriteUrl = icon[0];
      icon = icon[1] == "close" ? "share" : "close";
      svgUse.setAttributeNS(svgXLink, "xlink:href", `${svgSpriteUrl}#${icon}`);
    },

    init() {
      this.mainNavLinks = document.querySelectorAll(".sectionNav__link"); // "nav ul li a"

      Object.entries(data).forEach(([key, value]) => {
        this.sections.push(key);
        for (let item of value) {
          this.items.push(item);
        }
      });

      window.addEventListener(
        "scroll",
        throttle(() => {
          this.onScroll();
        }, 200)
      );

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
