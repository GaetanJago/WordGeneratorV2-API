//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const mongoose = require('mongoose');
const routes = require('./routes');

// define the Express app
const app = express();

// the database
const questions = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://gaetan-jagorel.eu.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'n1yLuQDCF1jgulxAwIuWt5jKX2TKFvle',
    issuer: 'https://gaetan-jagorel.eu.auth0.com/',
    algorithms: ['RS256']
});

const address = "mongodb://127.0.0.1/WordGenerator";

mongoose.connect(address, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
    }
});

routes(app, checkJwt)


// retrieve all questions
/*app.get('/', (req, res) => {
  const qs = questions.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    answers: q.answers.length,
  }));
  res.send(qs);
});

// get a specific question
app.get('/:id', (req, res) => {
  const question = questions.filter(q => (q.id === parseInt(req.params.id)));
  if (question.length > 1) return res.status(500).send();
  if (question.length === 0) return res.status(404).send();
  res.send(question[0]);
});

// insert a new question
app.post('/', checkJwt, (req, res) => {
    console.log(req);
    const {title, description} = req.body;
    const newQuestion = {
      id: questions.length + 1,
      title,
      description,
      answers: [],
      author: req.user.name,
    };
    questions.push(newQuestion);
    res.status(200).send();
  });
  
  // insert a new answer to a question
  app.post('/answer/:id', checkJwt, (req, res) => {
    const {answer} = req.body;
  
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
  
    question[0].answers.push({
      answer,
      author: req.user.name,
    });
  
    res.status(200).send();
  });*/

// start the server
app.listen(12345, () => {
    console.log('listening on port 12345');
});