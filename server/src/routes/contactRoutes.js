const express = require('express')
const rateLimit = require('express-rate-limit')
const { createMessage, getMessages } = require('../controllers/contactController')
const adminAuth = require('../middlewares/adminAuth')

const router = express.Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: 'Too many requests, please try again later.' },
})

router.post('/', limiter, createMessage)
router.get('/', adminAuth, getMessages)

module.exports = router