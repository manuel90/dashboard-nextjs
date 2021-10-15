/**
 * Internal API to Connect with the API https://disease.sh/docs/
 */
const express = require('express')

const app = express()

const { dashboard } = require('./endpoints')
const services = require('./services')

//Routers
const router = express.Router();

const dashboardHandler = dashboard(services);

router.get('/all-world-data', dashboardHandler.allWorldData)
router.get('/countries', dashboardHandler.allCountries)
router.get('/countries/:id', dashboardHandler.getCountry)

module.exports = router
