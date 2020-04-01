# Covid Church Handbook

## Technical stack

- Google Sheet with data
- Imported into 11ty at build
- Deployed to Netlify

## Set up a Google Sheet

- The first sheet acts as your content store with a. field names in row 1 and b. content from rows 2 onward
- Tap `File` > `Publish to the web` in the menu bar
- From the sheet URL, make a note of the sheet id and set it in `src/_data/prod/sheet.js`
- Tap `Tools` > `Script editor` and replace the Code.gs content with this, give it a name and save the file.

```javascript
/**
 * @OnlyCurrentDoc Limits the script to only accessing the current sheet.
 */

/**
 * Lifecycle method to add publish menu
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [{ name: "Update", functionName: "triggerDeploy" }];
  spreadsheet.addMenu("Publish", menuItems);
}

function triggerDeploy() {
  var netlify_id = "<netify build hook id goes here>";

  var options = {
    method: "post"
  };

  UrlFetchApp.fetch(
    "https://api.netlify.com/build_hooks/" + netlify_id,
    options
  );
}
```

- You can also hook the depoloy trigger to a "button" by inserting a drawing of a rectangle with a text label on it. Click on the dots in the top right corner of the button and select `Assign a script` and enter `triggerDeploy`
- The first time you run the script it will ask you for permissions to run

## Set up Netlify

- Log in to your Netlify account
- Click `New site from git` and enter your public repo link
- Set build command to `npm run production` and publish directory to `dist`
- Add a deploy hook to trigger content updates:
- Tap `Build and Deploy` > `Build hooks` > `Add build hook`
- Set build command to `npm run content`
- Forward your site to your own public domain

## Project development

- `npm install`
- `npm run seed` - Pulls an inital seed set of data
- `npm run dev`

### Compiles and minifies for production

- `npm install`
- `npm run production`

## Datasources

Eleventy pulls in the list of resources from a Google Sheet (see `src/data/prod/sheet.js`). In development you can seed this by running `npm run seed`.

Additional data (site metadata and contributors) is set in `src/src/shared/generalData.json`
