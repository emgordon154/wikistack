const wikiRouter = new require('express').Router();

wikiRouter.get('/', function (req, res, next){
  // do something
});

wikiRouter.post('/', function (req, res, next){
  // do something
});

wikiRouter.get('/add', function (req, res, next){
  res.render('addpage');
});

module.exports = {
  wikiRouter: wikiRouter
}