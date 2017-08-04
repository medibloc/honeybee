var express = require('express')
var router = express.Router()

var mongoose = require('mongoose')
var History = mongoose.model('History')

router.get('/', function(req, res) {
  return res.json({health: 'ok'})
})

router.post('/histories', (req, res, next) => {
  console.log(JSON.stringify(req.body))
  let history = new History(req.body)

  history.save((e, r) => {
    if (e) { return next(e) }
    return res.json(r)
  })
})

router.get('/histories', (req, res, next) => {
  console.log('Query got: ' + JSON.stringify(req.query))
  let keys = Object.keys(req.query)
  if (keys.length > 0) {
    keys.forEach((key) => {
      if (req.query[key] === '') {
        delete req.qeury[key]
      }
    })

    History.find(req.query)
      .sort({date: -1})
      .exec((e, r) => {
        if (e) {return res.status(400).json({message: e})}
        console.log('History.find result: ' + JSON.stringify(r))
        return res.json(r)
      })
  } else {
    return res.status(401).json({message: 'No query'})
  }
})

router.get('/clear', (req, res, next) => {
  mongoose.connection.db.dropDatabase(next)
  return res.json({message: 'Cleared'})
})

module.exports = router
