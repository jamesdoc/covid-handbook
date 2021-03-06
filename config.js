const { DateTime } = require("luxon");

module.exports = {
  metadata: {
    title: "Covid-19: Digital Tools for the Church",
    description: "A crowdsourced index of useful digital communication tools for church leaders, communications teams and church staff to refer to during the coronavirus outbreak.",

    // you can get this from the URL of your Google sheet
    sheetId: "1Z3OcDa1iqiXnCTvZRH2HOIzFfOn3BgxZB9f6-d5HFNY",
    formId: "1FAIpQLScjCELAdFEej0Ak7zrHo2I13jPhyiN5c4zWmOjyLe68w9__HQ",
    ogImage: "assets/img/ogimage.jpg",
    rootUrl: "https://covid.churcheshandbook.co.uk/",

    // Google Tag Manager
    gtm: "GTM-N3WSC3G",

    env: process.env.ELEVENTY_ENV,
    buildTime: DateTime.local().toFormat("d MMMM yyyy - H.mm")
  },

  theme: {
    brandColor: "#c15549",
    bodyFont: "Rubik",
    headingFont: "Oswald"
  },

  // Add in custom intro paragraphs for each section
  // 100% optional
  sections: {
    'starter-guide': {
      'intro': 'Where to start and what to consider.',
    },
    'prayer': {
      'intro': 'Prayer is not our only response, but it should be our first response.',
    },
    'church-response': {
      'intro': 'Best practise examples of how churches, key leaders and networks have responded to the coronavirus, either continuing services, cancelling services, sharing encouraging words, direction or providing language around this pandemic.',
    }
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
