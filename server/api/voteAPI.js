const express = require('express')
const { getAllVotes, getMyVotes } = require('./voteFunctions/getAllVotes')

const voteRouter = express.Router()

voteRouter.get('/', (req, res) => {
    getAllVotes()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

voteRouter.get('/my', (req, res) => {
    const ip = req.headers['x-forwarded-for'] ?? req.headers.ip
    //console.log(ip)
    getMyVotes(ip)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

voteRouter.post('/', (req, res) => {
    console.log(new Date().toISOString().slice(0, 19).replace('T', ' '))
    let data = {
      'ipAddress': req.headers['x-forwarded-for'],
      'createdTime': new Date().toISOString().slice(0, 19).replace('T', ' '),
      'projectID': req.body.projectID
    }
    createUpvote(data)
    .then(row => {
      res.json(row);
    })
    .catch(err => {
      console.log(err);
      res.status(500)
    })
  })

module.exports = voteRouter