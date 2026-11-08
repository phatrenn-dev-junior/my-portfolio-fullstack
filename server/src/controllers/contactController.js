const Message = require('../models/Message')

const clean = (value) => (typeof value === 'string' ? value.trim() : '')

async function createMessage(req, res, next) {
  try {
    const saved = await Message.create({
      name: clean(req.body.name),
      email: clean(req.body.email),
      message: clean(req.body.message),
    })

    res.status(201).json({ message: 'Message received', id: saved.id })
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Invalid data',
        errors: error.errors.map((e) => e.message),
      })
    }
    next(error)
  }
}
async function getMessages(req, res, next) {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100)

    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']],
      limit,
    })

    res.json(messages)
  } catch (error) {
    next(error)
  }
}

module.exports = { createMessage , getMessages}