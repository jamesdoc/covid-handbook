# Covid Church Handbook

## Technical stack

- Google Sheet with data
- Imported into 11ty at build
- Deployed to Netlify

## Project development

- `npm install`
- `npm run seed` - Pulls an inital seed set of data
- `npm run dev`

### Compiles and minifies for production

- `npm install`
- `npm run seed`
- `npm run buildAssets`

## Datasources

Eleventy pulls in the list of resources from a Google Sheet (see `src/data/prod/sheet.js`). In development you can seed this by running `npm run seed`.

Additional data (site metadata and contributors) is set in `src/src/shared/generalData.json`
