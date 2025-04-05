const express = require('express')
const app = express()
const webpack = require('webpack')
const config = require('../webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const compiler = webpack(config)
const path = require('path')

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(require("webpack-hot-middleware")(compiler));

app.get('/public/:name', (req, res) => {
    res.sendFile(path.join(__dirname, '../public') + '/' + req.params.name)
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log("server started")
})

