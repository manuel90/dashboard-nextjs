/**
 * Node JS Server
 */

const express = require('express')
const next = require('next')

const api = require('./api');
const fs = require('fs')
const path = require('path')


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'stage'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {

  const server = express()


  server.use('/healthcheck', require('express-healthcheck')({
    healthy: function () {
      return { everything: 'is ok' };
    }
  }))

  server.use('/api', api);

  server.all('/favicon.ico', (req, res) => {
    return handle(req, res)
  });

  server.all('/js/*', (req, res) => {
    return handle(req, res)
  });

  server.all('/images/*', (req, res) => {
    return handle(req, res)
  });

  server.all('/fonts/*', (req, res) => {
    return handle(req, res)
  });

  server.all('/_next/*', (req, res) => {
    return handle(req, res)
  });


  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});
