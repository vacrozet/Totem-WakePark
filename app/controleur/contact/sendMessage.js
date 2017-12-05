function error (res, code, bool, message) {
  res.status(code)
  res.json({
    success: bool,
    message: message
  })
}

module.exports = (req, res) => {
  if (req.body.name === undefined || req.body.email === undefined || req.body.sujet === undefined ||
    req.body.message === undefined) return error(res, 403, false, 'Query Not Found')

  // Send mail

  res.status(200)
  res.json({
    success: true,
    message: 'Message Send'
  })
}
