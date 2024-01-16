const cors = require('cors');

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})


const corsOptions = {
  // origin: 'https://thinhxd12.github.io',
  origin: ['http://localhost:8080', 'https://thinhxd12.github.io'],
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


// // http://localhost:2020/trans?text=parlous&from=en&to=vi

fastify.get('/wakeup', async (request, reply) => {
  return { res: 'it worked!' }
})

fastify.get('/trans', corsOptions, async (req, reply) => {
  const { text, from, to } = req.query;

  try {
    const result = await translate(text, from, to, defaultTransOptions);
    return result;
  } catch (err) {
    reply.code(500).send({ error: 'Translation failed', details: err.message });
  }
});


const gTTS = require('gtts');

fastify.get('/hear', async (req, reply) => {
  const { text, lang } = req.query;

  try {
    const gtts = new gTTS(text, lang);
    reply.header('Content-Type', 'audio/mpeg');
    gtts.stream().pipe(reply.raw);
  } catch (err) {
    reply.code(500).send({ error: 'Text-to-Speech failed', details: err.message });
  }
});
