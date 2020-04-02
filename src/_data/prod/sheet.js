const axios = require("axios");
const seed = require("../../_utils/saveSeed.js");
const { metadata } = require("../../../config.js");

const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${metadata.sheetId}/1/public/values?alt=json`;

const env = process.env.ELEVENTY_ENV;

module.exports = () => {
  return new Promise((resolve, reject) => {
    console.log(`Requesting data from ${googleSheetUrl}`);

    axios
      .get(googleSheetUrl)
      .then(response => {
        // massage the data from the Google Sheets API into
        // a shape that will more convenient for us in our SSG.
        var data = {};

        response.data.feed.entry.forEach(item => {
          if (item.gsx$verified.$t == "TRUE" && item.gsx$title.$t != "") {
            let section = item.gsx$section.$t;

            if (section == "") {
              section = "Uncategorised";
            }

            if (data.hasOwnProperty(section) == false) {
              data[section] = [];
            }

            data[item.gsx$section.$t].push({
              title: item.gsx$title.$t,
              country: item.gsx$country.$t,
              contributor: item.gsx$contributor.$t,
              source: item.gsx$source.$t,
              url: item.gsx$url.$t,
              type: item.gsx$type.$t,
              section: item.gsx$section.$t,
              subsection: item.gsx$sub - section.$t,
              date: item.gsx$date.$t,
              host: item.gsx$host.$t,
              paid: item.gsx$paid.$t,
              tags: item.gsx$tags.$t.split(",")
            });

            if (env == "seed") {
              console.log(`✅ Imported: ${item.gsx$title.$t}`);
            }
          }
        });

        // stash the data locally for developing without
        // needing to hit the API each time.
        seed(JSON.stringify(data), `${__dirname}/../dev/sheet.json`);

        // resolve the promise and return the data
        resolve(data);
      })

      // uh-oh. Handle any errrors we might encounter
      .catch(error => {
        console.log("Error :", error);
        reject(error);
      });
  });
};
