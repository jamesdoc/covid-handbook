# Covid Church Handbook

## Technical stack

- Google Sheet with data
- Converted to a static website with 11ty
- Deployed to Netlify

## Set up Netlify

- Log in to your Netlify account
- Click `New site from git` and enter your public repo link
- Set build command to `npm run production` and publish directory to `dist`
- Add a deploy hook to trigger content updates:
- Tap `Build and Deploy` > `Build hooks` > `Add build hook`
- Set build command to `npm run production`
- Note the build hook id which you will need in the next section
- Forward your site to your own public domain

## Set up a Google Sheet

- [Make a copy of the sheet template](https://docs.google.com/spreadsheets/d/1OaLb4Rq-M1ucJVatuyoc-5muFAe4bwaOGVXfD48AcrQ/copy?usp=sharing)
- Tap `File` > `Publish to the web` in the menu bar
- Tap `Tools` > `Script editor` and fill in your netlify build hook id and save the changes.
- On the `Lists` tab, fill in your sections and resource types
- Add some resources in the `Content` tab

The first time you tap on the `Publish` button your script will ask you for permissions to run.

Only rows ticked as `Verified` will be published.

## Configure the app

Edit the values in `config.js` to link your app to your spreadsheet and tweak the site theme, title and other meta data

Also fill out the `about.md` file for giving more information about your collection and for communicating your contact details.

## Project development

- `npm install`
- `npm run seed` - Pulls an inital seed set of data
- `npm run dev`

You can rehydrate the content from the linked spreadsheet any time with this commend:

```bash
npm run content
```

### ⚠️ Warning

The JSON endpoint provided by the Google Sheet will stop providing data as soon as it hits an empty row. You have been warned.

## Hosting with another service?

As soon as you run `npm run production` everything you need is created in the `/dist` folder. This folder can be copied across into your hosting platform of choice.

### Surge

[Surge](https://surge.sh/) is a quick an easy tool for deploying static sites. You won't get the benefits of automagical deploys straight from the Google Sheet, but one you have Surge installed locally (`npm install -g surge`), you can deploy with:

```bash
surge dist
```

Read up on [Surge](https://surge.sh/).

### Self host

Let's say you have a Digital Ocean droplet with Nginx or Apache on it… Once you have cloned this repo you can then run…

```bash
npm install
npm run production
```

Finally update your server config to serve from the `./dist` and everything should be happy.

### Deploy from a different folder?

By default the generated assets will be created in the `dist` folder. I can't imagine why you would want to change that… but if you do you'll need to update `const publicRoot = 'dist';` in the following files:

- `.eleventy.js`
- `webpack.mix.js`

## Tech debt

- remove /updates
