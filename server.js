const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.locals.title = 'Movie Server';


app.post('/api/v1/users', (request, response) => {
  const user = request.body
  const keys = ['name', 'email', 'password'];

  for (let requiredParameter of keys) {
    if (user[requiredParameter] === undefined) {
      response.status(422)
        .json(`You are missing a ${requiredParameter} property`);
    }
  }

  database('users').insert(user, [...keys, 'id'])
    .then(user => response.status(201).json({ 
      message: 'New user created', 
      id: user[0].id
    }))
    .catch(error => response.status(500).json({ error }));
})

app.get('/api/v1/users/:user', (request, response) => {
  const { email, password } = JSON.parse(request.params.user);

  database('users').where({ email, password }).select()
    .then(user => {
      if (user.length) {
        const { id, name } = user[0];
        response.status(200).json({ id, name, message: 'retrieved one user' });
      } else {
        response.status(404).json('No messages found');
      }
    })
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`); // eslint-disable-line
});

module.exports = { app, database };