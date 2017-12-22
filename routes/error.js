const
  config = require('config'),
  {errors} = config

exports.handler = (req, res) => {
  let flash = req.flash().error[0]

  res.json({
    msg: `${req.params.type} Error: ${flash ? flash : errors[req.query.error]}`,
    status: 'failed'
  })
}
