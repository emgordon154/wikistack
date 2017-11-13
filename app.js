const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', { noCache: true });

// models.db.sync({force: true})
//   .then(function() {
//     app.listen(3000, () => console.log('Server is listening on port 3000'))
//   })
//   .catch(console.error)

models.db.sync({})
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

const {router} = require('./routes');

app.use(express.static('static'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/', function(req,res,next) {
    res.render('index')
})
app.use('/', router);

