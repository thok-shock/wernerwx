const express = require('express')
const app = express()
const webpack = require('webpack')
const config = require('../webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const compiler = webpack(config)
const path = require('path')
const db = require('./db.js')
//const apiRouter = require('./api/api.js')
const cors = require('cors')
const nfetch = require('node-fetch');

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

app.use(cors());

app.get('/radar/:z/:x/:y', async (req, res) => {
    const { z, x, y } = req.params;
    const radarUrl = `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/ridge::N0Q-900913/${z}/${x}/${y}.png`;
  
    try {
      const response = await nfetch(radarUrl);
      if (!response.ok) throw new Error('Failed to fetch radar tile');
  
      const imageBuffer = await response.buffer();
      res.set('Content-Type', 'image/png');
      res.send(imageBuffer);
    } catch (err) {
      console.error(err);
      res.status(500).send('Radar tile fetch failed.');
    }
  });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build') + '/' + 'index.html')
// })

//app.use('/api', apiRouter)

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log("server started")
})

