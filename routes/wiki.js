const wikiRouter = new require('express').Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.post('/', function (req, res, next) {

  var title = req.body.title
  var content = req.body.content
  
  User.findOrCreate({
    where: {
      name: req.body.author,
      email: req.body.email
    }
  })
    .then(function (values) {

      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });

      return page.save().then(function (page) {
        return page.setAuthor(user);
      });

    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);
})


// STUDENT ASSIGNMENT:
// make sure we only redirect *after* our save is complete!
// note: `.save` returns a promise or it can take a callback.


wikiRouter.get('/', function (req, res, next) {
  res.redirect('/')
});

wikiRouter.get('/add', function (req, res, next) {
  res.render('addpage');
});

wikiRouter.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  }).then(function (foundPage) {
    //console.log(foundPage.title)
    foundPage.getAuthor().then(function(author){
      console.log(author.name)
      res.render('wikipage', {
        title: foundPage.title,
        content: foundPage.content,
        author: author.name
      });
    })
  }).catch(next);
})


module.exports = {
  wikiRouter: wikiRouter
}