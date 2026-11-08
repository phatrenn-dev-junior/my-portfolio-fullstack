const crypto = require('crypto')

const hash = (value) => crypto.createHash('sha256').update(String(value)).digest()

function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_KEY
  const provided = req.get('x-admin-key')

  if (!expected || !provided) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (!crypto.timingSafeEqual(hash(provided), hash(expected))) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}

module.exports = adminAuth