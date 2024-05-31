const port = process.env.PORT || 3000;
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

const fastify = require('fastify')()
const cors = require('@fastify/cors')

fastify.register(cors, {
  origin: ['http://localhost:3000','https://hoctuvung3.netlify.app','https://hoctuvung3.vercel.app'],
  methods: ['GET', 'POST']
});

fastify.listen({ host: host, port: port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})

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


fastify.get('/trans', async (req, reply) => {
  const { text, from, to } = req.query;

  try {
    const result = await translate(text, from, to, defaultTransOptions);
    return result;
  } catch (err) {
    reply.code(500).send({ error: 'Translation failed', details: err.message });
  }
});

const Gtts = require('gtts');

fastify.get('/hear', function (req, res) {
  const gtts = new Gtts(req.query.text, req.query.lang);
  gtts.stream().pipe(res.raw);
});
