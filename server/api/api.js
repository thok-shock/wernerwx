const express = require('express')
const projectRouter = require('./projectsAPI')
const voteRouter = require('./voteAPI')

const apiRouter = express.Router()

apiRouter.use('/project', projectRouter)
apiRouter.use('/vote', voteRouter)

module.exports = apiRouter