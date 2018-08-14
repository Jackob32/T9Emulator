var express = require('express');
var router = express.Router();

const keyboard = [
  [],
  [],
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
  ["j", "k", "l"],
  ["m", "n", "o"],
  ["p", "q", "r", "s"],
  ["t", "u", "v"],
  ["w", "x", "y", "z"],
];

/* GET api results listing. */
router.get('/', function(req, res, next) {

  console.log(req.query.dialed);

  let result = [];

  if (req.query.dialed && Number.isInteger(parseInt(req.query.dialed))) {

    let sDialed = req.query.dialed.toString();

    for (let n = 0; n < keyboard[parseInt(sDialed[0], 10)].length; n++) {
      result.push(keyboard[parseInt(sDialed[0], 10)][n]);
    }

    //for each char in number
    for (var i = 1; i < sDialed.length; i++) {

      let tmpres = [];
      var keyint = parseInt(sDialed[i], 10);
      //extend results
      for (var p = 0; p < result.length; p++) {
        //by the possibilities
        for (var n = 0; n < keyboard[keyint].length; n++) {
          tmpres.push(result[p] + keyboard[keyint][n]);
        }
      }
      result = tmpres;

    }

    res.json(result);

  } else {
        res.status(404).send();
  }
});

module.exports = router;
