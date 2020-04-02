const { DateTime } = require("luxon");

module.exports = {
  metadata: {
    title: "Covid-19: Digital Tools for Church",
    description:
      "A crowdsourced index of useful digital communication tools for church leaders, communications teams and church staff to refer to during the coronavirus outbreak.",

    // you can get this from the URL of your Google sheet
    sheetId: "1Q4o21Cc2xgq9FAaAsahcOAUwByQuAoFDEW5MUpy1ZnE",
    ogImage: "",
    rootUrl: "",

    // Google Tag Manager
    gtm: "GTM-N3WSC3G",

    env: process.env.ELEVENTY_ENV,
    buildTime: DateTime.local().toFormat('d MMMM yyyy - H.mm'),
  },

  theme: {
    brandColor: "#fd8979",
    bodyFont: "Rubik",
    headingFont: "Oswald"
  },

  contributors: [
    {
      name: "Mark Crosby",
      url: "https://www.twitter.com/markcrosby",
      desc: "Vineyard Churches, UK & Ireland",
      role: ["content"]
    },
    {
      name: "Benjamin Lyon",
      url: "https://twitter.com/benjlyon",
      desc: "Living Rock Church",
      role: ["content"]
    },
    {
      name: "Ben Elliott",
      url: "https://twitter.com/CPOresources",
      desc: "Christian Publishing Outreach",
      role: ["content"]
    },
    {
      name: "Peter Murden",
      url: "https://twitter.com/peter_murden",
      desc: "Digital Church Toolkit",
      role: ["content"]
    },
    {
      name: "Finn Johnston",
      url: "https://twitter.com/peter_murden",
      desc: "Digital Church Toolkit",
      role: ["content"]
    },
    {
      name: "Liz Morgan",
      url: "http://www.twitter.com/Social_Morgan_",
      desc: "Church of England",
      role: ["content"]
    },
    {
      name: "James Doc",
      url: "https://www.jamesdoc.com",
      desc: "Kingdom Code, OneSheep",
      role: ["content", "tech"]
    },
    {
      name: "Arun Mahtani",
      url: "https://www.onesheep.org",
      desc: "OneSheep",
      role: ["tech"]
    },
    {
      name: "Sam Peckham",
      url: "https://www.onesheep.org",
      desc: "OneSheep",
      role: ["tech"]
    },
    {
      name: "Jannie Theunissen",
      url: "https://www.onesheep.org",
      desc: "OneSheep",
      role: ["tech"]
    },
    {
      name: "Linton Caldecott",
      url: "https://www.onesheep.org",
      desc: "OneSheep",
      role: ["tech"]
    },
    {
      name: "Joe Reeves",
      url: "https://twitter.com/isnit0",
      desc: "Newspeak House and Gived.",
      role: ["tech"]
    }
  ]
};
