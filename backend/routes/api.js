let express = require('express');
let router = express.Router();

const keyboard = {
0:[],
1:[],
2:["a", "b", "c"],
3:["d", "e", "f"],
4:["g", "h", "i"],
5:["j", "k", "l"],
6:["m", "n", "o"],
7:["p", "q", "r", "s"],
8:["t", "u", "v"],
9:["w", "x", "y", "z"]
};


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
    for (let i = 1; i < sDialed.length; i++) {

      let tmpres = [];
      let keyint = parseInt(sDialed[i], 10);
      //extend results
      for (let p = 0; p < result.length; p++) {
        //by the possibilities
        for (let n = 0; n < keyboard[keyint].length; n++) {
          tmpres.push(result[p] + keyboard[keyint][n]);
        }
      }
      result = tmpres;

    }

  } res.json(result);

});

module.exports = router;
