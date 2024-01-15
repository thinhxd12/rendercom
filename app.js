const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');

const corsOptions = {
  origin: 'https://thinhxd12.github.io',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const translate = require('google-translate-extended-api');
const defaultTransOptions = {
  returnRawResponse: false,
  detailedTranslations: true,
  definitionSynonyms: false,
  detailedTranslationsSynonyms: true,
  definitions: false,
  definitionExamples: false,
  examples: false,
  removeStyles: false
}

const getExampleTransOptions = {
  returnRawResponse: false,
  detailedTranslations: false,
  definitionSynonyms: false,
  detailedTranslationsSynonyms: false,
  definitions: false,
  definitionExamples: false,
  examples: true,
  removeStyles: false
}

// http://localhost:2020/trans?text=parlous&from=en&to=vi
app.get('/trans', cors(corsOptions), async (req, res) => {
  const text = req.query.text;
  const from = req.query.from;
  const to = req.query.to;

  let result = await translate(text, from, to, defaultTransOptions).then((res) => {
    return JSON.stringify(res, undefined, 2);
  }).catch(console.log);
  res.type('html').send(result);
});

app.get('/example', cors(corsOptions), async (req, res) => {
  const text = req.query.text;
  const from = req.query.from;
  const to = req.query.to;

  let result = await translate(text, from, to, getExampleTransOptions).then((res) => {
    return JSON.stringify(res, undefined, 2);
  }).catch(console.log);
  res.type('html').send(result);
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// server.keepAliveTimeout = 180 * 1000;
// server.headersTimeout = 180 * 1000;

const Gtts = require('gtts');

app.get('/hear', function (req, res) {
  const gtts = new Gtts(req.query.text, req.query.lang);
  gtts.stream().pipe(res);
});

app.get('/wakeup', function(req, res) => {
  const result = {status:'ok'};
  res.type('html').send( JSON.stringify(result));
});
