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


// app.get('/api/v1/staff', (request, response) => {
//   database('staff').select()
//     .then(staff => {
//       response.status(200).json(staff);
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });



// app.delete('/api/v1/schedule/:id', (request, response) => {
//   database('staff_events').where('id', request.params.id).del()
//     .then(staff_event => {
//       if (staff_event) {
//         response.status(200)
//           .json(`Deleted staff_event id: ${request.params.id}`);
//       } else {
//         response.status(404).json('Delete failed, staff_event id not found');
//       }
//     });
// });

// app.post('/api/v1/schedule', (request, response) => {
//   const schedule = request.body;
//   const keys = ['event_id', 'staff_id', 'role'];

//   for (let requiredParameter of keys) {
//     if (schedule[requiredParameter] === undefined) {
//       response.status(422)
//         .json(`You are missing a ${requiredParameter} property`);
//     }
//   }

//   database('staff_events').insert(schedule, [...keys, 'id'])
//     .then(schedule => {
//       response.status(201).json(schedule[0]);
//     })
//     .catch(error => {
//       response.status(500).json({ error });
//     });
// });



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`); // eslint-disable-line
});

module.exports = { app, database };