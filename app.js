const app = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const db = require('./models');


models.db.sync({force: true})
  .then(function() {
    app.listen(3000, () => console.log('Server is listening on port 3000'))
  })
  .catch(console.error)

