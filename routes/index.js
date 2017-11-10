const router = new require('express').Router();
const {userRouter} = require('./user.js');
const {wikiRouter} = require('./wiki.js')

router.use('/wiki', wikiRouter)
router.use('/user', userRouter)

module.exports = {
  router: router,
}