const express = require('express')
const app = express()
const webpack = require('webpack')
const config = require('../webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const compiler = webpack(config)
const path = require('path')
const db = require('./db.js')
//const apiRouter = require('./api/api.js')

//if prod, do not hot load
if (process.env.NODE_ENV !== "production") {
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }))
    app.use(require("webpack-hot-middleware")(compiler));
}

app.get('/public/:name', (req, res) => {
    res.sendFile(path.join(__dirname, '../build') + '/' + req.params.name)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build') + '/' + 'index.html')
})

app.use('/api', apiRouter)

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log("server started")
})

