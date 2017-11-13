const router = new require('express').Router();
const {userRouter} = require('./user.js');
const {wikiRouter} = require('./wiki.js')
const models = require('../models');
const Page = models.Page; 

router.use('/wiki', wikiRouter)
router.use('/user', userRouter)

router.get('/', function(req,res,next){
  Page.findAll({})
    .then(function(allPages) {
      res.render('index', {pages: allPages})
    })

})

module.exports = {
  router: router,
}