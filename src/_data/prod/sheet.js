const axios = require("axios");
const seed = require("../../_utils/saveSeed.js");
const { metadata } = require("../../../config.js");

const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${metadata.sheetId}/1/public/values?alt=json`;

const env = process.env.ELEVENTY_ENV;

module.exports = () => {
  let sanitize = function(s) {
    return s.toString().replace(/'+/g, "");
    // .replace(/'+/g, "&apos;");
  };

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
            let section = sanitize(item.gsx$section.$t);

            if (section == "") {
              section = "Uncategorised";
            }

            if (data.hasOwnProperty(section) == false) {
              data[section] = [];
            }

            data[section].push({
              timestamp: item.gsx$timestamp.$t,
              title: item.gsx$title.$t,
              url: item.gsx$url.$t,
              section: sanitize(item.gsx$section.$t),
              type: item.gsx$type.$t,
              source: item.gsx$source.$t,
              country: item.gsx$country.$t,
              paid: item.gsx$paid.$t === "Yes",
              date: item.gsx$startdate.$t,
              enddate: item.gsx$enddate.$t,
              time: item.gsx$time.$t,
              timezone: item.gsx$timezone.$t,
              host: item.gsx$host.$t,
              contributor: item.gsx$contributor.$t
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

/*
 
let sanitize = function(s) {
  return s
    .toString()
    .replace(/'+/g, "&apos;");
};

let test = [
  {in:"This is fine", expected: "This is fine"},
  {in:"It's fine", expected: "It&apos;s fine"},
  {in:"Two it's can't don't", expected: "Two it&apos;s can&apos;t don&apos;t"},
];

test.forEach(t => {
  let safe = sanitize(t.in);
  let pass = (t.expected === safe);
  console.log(`${safe}: ${pass}`);
});
  
 */
