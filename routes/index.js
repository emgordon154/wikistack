const router = new require('express').Router();
const {userRouter} = require('./user.js');
const {wikiRouter} = require('./wiki.js')


module.exports = {
  router: router,
  userRouter: userRouter,
  wikiRouter: wikiRouter
}