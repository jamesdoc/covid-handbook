const axios  = require('axios');
const seed   = require('../../_utils/saveSeed.js');

const sheetID = "1seP5plohulVEQOmUa4y4o8ry0Vobeg_zTzbHM_FyMAw";
const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/1/public/values?alt=json`;

const env = process.env.ELEVENTY_ENV;

module.exports = () => {
  return new Promise((resolve, reject) => {

    console.log(`Requesting data from ${googleSheetUrl}`);

    axios.get(googleSheetUrl)
      .then(response => {
        // massage the data from the Google Sheets API into
        // a shape that will more convenient for us in our SSG.
        var data = {
          "content": []
        };
        response.data.feed.entry.forEach(item => {
          // console.log(item.gsx$verified.$t);
          if (item.gsx$verified.$t == "TRUE" && item.gsx$title.$t != '') {
            data.content.push({
              "title": item.gsx$title.$t,
              "description": item.gsx$description.$t,
              "author": item.gsx$author.$t,
              "url": item.gsx$url.$t,
              "type":  item.gsx$type.$t,
              "section": item.gsx$section.$t,
              "date": item.gsx$date.$t,
              "tags": item.gsx$tags.$t.split(","),
            });

            if (env== 'seed') {
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
        console.log('Error :', error);
        reject(error);
      });
  })
}
