# Covid Church Handbook

## Technical stack

- Google Sheet with data
- Imported into 11ty at build
- Deployed to Netlify

## Set up a Google Sheet

- The first sheet acts as your content store with a. field names in row 1 and b. content from rows 2 onward
- Tap `File` > `Publish to the web` in the menu bar
- Tap `Tools` > `Script editor` and replace the Code.gs content with the following, give it a name and save the file.

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
  var netlifyId = "<netify build hook id goes here>";

  var options = {
    method: "post"
  };

  UrlFetchApp.fetch(
    "https://api.netlify.com/build_hooks/" + netlifyId,
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
- Note the build hook id and enter it in the script above
- Forward your site to your own public domain

## Configure the app

Edit the values in `config.js` to link your app to your spreadsheet and tweak the site theme

## Project development

- `npm install`
- `npm run seed` - Pulls an inital seed set of data
- `npm run dev`

you can rehydrate the content from the linked spreadsheet any time with this commend:

```bash
npm run content
```

## Datasources

Eleventy pulls in the list of resources from a Google Sheet (see `src/data/prod/sheet.js`). In development you can seed this by running `npm run seed`.

Additional data (site metadata, google tag manager id, contributors, etc) is set in `src/src/shared/generalData.json`

### ⚠️ Warning

The JSON endpoint provided by the Google Sheet will stop providing data as soon as it hits an empty row. You have been warned.
