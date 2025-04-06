const express = require('express')
const getAllProjects = require('./projectFunctions/getAllProjects')

const projectRouter = express.Router()

projectRouter.get('/', (req, res) => {
    getAllProjects()
    .then(data => res.json(data))
    .catch(err => {console.log(err); res.sendStatus(500)});
})

module.exports = projectRouter