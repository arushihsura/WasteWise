const express = require('express')
const { getRoutes } = require('../controllers/routesController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/:city', protect, getRoutes)

module.exports = router
