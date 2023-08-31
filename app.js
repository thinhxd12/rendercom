const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));


server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World 123!'
//   });
// });

// app.get('/:name', (req, res) => {
//   let name = req.params.name;

//   res.json({
//     message: `Hello ${name}`
//   });
// });

// app.listen(2020, () => {
//   console.log('server is listening on port 2020');
// });




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


// http://localhost:2020/trans?text=parlous&from=en&to=vi
app.get('/trans', async (req, res) => {
  const text = req.query.text;
  const from = req.query.from;
  const to = req.query.to;

  let result = await translate(text, from, to, defaultTransOptions).then((res) => {
    return JSON.stringify(res, undefined, 2);
  }).catch(console.log);
  res.type('html').send(result);
});


