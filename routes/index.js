var express = require('express');
var router = express.Router();
var QRCode = require('qrcode')


/* GET home page. */
router.get('/', function (req, res, next) {
  QRCode.toDataURL('I am a pony!').then(url => {
    res.render('index', { title: 'Hello World from Simple QR Generator', qrURL: url });
  })
    .catch(err => { throw err })
});
router.get('/getQR', (req, res) => {
  const text = req.query.text;
  console.log(text);
  QRCode.toDataURL(text).then(url => {
    res.render('index', { title: 'Hello World from Simple QR Generator', data: text, qrURL: url });
  })
    .catch(err => { throw err })
})

module.exports = router;
