const router = new require('express').Router();
const {userRouter} = require('./user.js');
const {wikiRouter} = require('./wiki.js')

router.use('/wiki', wikiRouter)
router.use('/user', userRouter)

router.get('/', function(res,req,next){
  Page.findAll()
    .then(function(foundPages) {
      console.log(foundPages)
      res.render('index', {pages: foundPages})
    })

})

module.exports = {
  router: router,
}