// Import the necessary modules
const fastify = require('fastify')();
const cors = require('fastify-cors');

// Register the cors plugin
fastify.register(cors, {
  origin: ['http://localhost:8080', 'https://thinhxd12.github.io'],
  methods: ["GET", "POST"]  // Allow only GET and POST methods
});

// Start the server
const port = process.env.PORT || 3000;
fastify.listen(port, '0.0.0.0', (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});

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


// trans?text=parlous&from=en&to=vi

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
