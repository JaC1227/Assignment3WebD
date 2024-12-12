const ghostContentAPI = require("@tryghost/content-api");
const handlebarsPlugin = require("@11ty/eleventy-plugin-handlebars");
const slugify = require("slugify");
const Handlebars = require("handlebars");

Handlebars.registerHelper("equal", (a, b) => a === b);

module.exports = function (eleventyConfig) {
  // Add Passthrough Copy for public files
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
  });

  eleventyConfig.addFilter("slugify", function(value) {
    return slugify(value, { lower: true, strict: true });
  });

  eleventyConfig.addPlugin(handlebarsPlugin, {
    helpers: {
      equal: (a, b) => a === b, // Explicitly register helper here
    },
  });

  
  return {
    markdownTemplateEngine: "hbs",
    htmlTemplateEngine: "hbs",
    dataTemplateEngine: "hbs",
  };
};