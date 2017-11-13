const wikiRouter = new require('express').Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRouter.post('/', function (req, res, next) {

  var title = req.body.title
  var content = req.body.content
  var author = User.findOrCreate({
    where:
    {
      name: req.body.author,
      email: req.body.email
    }
  })
    .then(function (author) {
      var page = Page.build({

        title: title,
        content: content,
        author: author.name

      })
      page.save().then((savedPage) => res.redirect(savedPage.route))
        .catch(next);
      // -> after save -> res.redirect('/');
    });
});


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
    res.render('wikipage', {
      title: foundPage.title,
      content: foundPage.content,
      author: foundPage.author
    });
  })
    .catch(next);
})


module.exports = {
  wikiRouter: wikiRouter
}