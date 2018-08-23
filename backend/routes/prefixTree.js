let express = require('express');
let router = express.Router();
let PrefixTree = require('prefix-tree');
let fs = require('fs');

router.translate = {
    "a": "2",
    "b": "2",
    "c": "2",
    "d": "3",
    "e": "3",
    "f": "3",
    "g": "4",
    "h": "4",
    "i": "4",
    "j": "5",
    "k": "5",
    "l": "5",
    "m": "6",
    "n": "6",
    "o": "6",
    "p": "7",
    "q": "7",
    "r": "7",
    "s": "7",
    "t": "8",
    "u": "8",
    "v": "8",
    "w": "9",
    "x": "9",
    "y": "9",
    "z": "9"
};

router.tree = new PrefixTree();

router.words = fs.readFileSync("./routes/google-10000-english-no-swears.txt", "utf8").split("\n");

router.generateTree = function () {
    router.words.forEach(function (word, p) {
        word = word.trim("\r");
        let T9word = "";
        for (let i = 0; i < word.length; i++) {
            let l = word[i];
            T9word += router.translate[l];
        }
        T9word += p;

        router.tree.set(T9word, {word, p});
    });

    console.log("Tree was Created");
};

function compare(a, b) {
    if (a.word.length === b.word.length) {
        return -1;
    } else {
        if (a.p < b.p)
            return -1;
        if (a.p > b.p)
            return 1;
    }
    return 0;
}

//https://github.com/first20hours/google-10000-english

router.generateTree();

/* GET api results listing. */
router.get('/', function (req, res, next) {

    console.log(req.query.dialed);

    var result = [];

    if (req.query.dialed && Number.isInteger(parseInt(req.query.dialed))) {

        var sDialed = req.query.dialed.toString();

        result = router.tree.get(sDialed);
        result = result.sort(compare);

        result = result.map((item) => {
            return item.word;
        });

        result = result.filter((item) => {
            if (sDialed.length <= item.length) return item;
        });

        result = result.slice(0, 50);
        console.log(result);
        res.statusCode = 200;
        res.json({status:"success", data:result});
    }else{
        res.statusCode = 400;
        res.json({
            status:"error",
            data:[],
            error:'Wrong Input'
    });
    }


});

module.exports = router;
