const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

models.db.sync({force: true})
  .then(function() {
    app.listen(3000, () => console.log('Server is listening on port 3000'))
  })
  .catch(console.error)


const {router} = require('./routes');


app.use('/', router);

