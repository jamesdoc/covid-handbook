const { DateTime } = require("luxon");

module.exports = function (eleventyConfig){

  let env = process.env.ELEVENTY_ENV;

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLLL yyyy");
  });

  eleventyConfig.addFilter("dewidow", s => {
    return s.replace(/ (?=[^ ]*$)/i, "&nbsp;");
  });

  // Set up updates collection
  eleventyConfig.addCollection("updates", function (collection) {
    return collection.getAllSorted().filter(function (item) {
      return item.inputPath.match(/^\.\/src\/updates\//) !== null;
    });
  });

  eleventyConfig.addLayoutAlias('default', 'templates/base.njk')
  eleventyConfig.addLayoutAlias('post', 'templates/post.njk')

  // Assets pass-through
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy({ "src/assets/static": "/" });

  env = (env=="seed") ? "prod" : env;
  return {
    templateFormats: ["html", "njk", "md"],
    pathPrefix: "/",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
      data: `_data/${env}`,
      includes: "_includes"
    },
  };
}
