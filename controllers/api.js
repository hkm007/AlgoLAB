const fs = require('fs');
const path = require('path');

function LCS(S1, m, S2, n) {
    var finalResult;
    
    if(m === 0 || n === 0) {
        finalResult = 0;
    } else if(S1[m - 1] === S2[n - 1]) { 
        finalResult = 1 + LCS(S1, m - 1, S2, n - 1);
    } else {
        var excludeLastOfS1 = LCS(S1, m - 1, S2, n),
            excludeLastOfS2 = LCS(S1, m, S2, n - 1);

        finalResult = Math.max(excludeLastOfS1, excludeLastOfS2);
    }
    return finalResult;
}

exports.dummyData = (req, res) => {
    let data = fs.readFileSync(path.join('./database/dummy.json'));
    res.send(JSON.parse(data))
}

exports.singleDummyData = (req, res) => {
    let raw = fs.readFileSync(path.join('./database/dummy.json'));
    let db = JSON.parse(raw).data;
    let result = db.find(x => x._id == req.params.id)

    if(result !== undefined) {
        res.json(result)
    } else {
        res.json({error: "Something went wrong"})
    } 
}

exports.fact = (req, res) => {
    let data = fs.readFileSync(path.join('./database/fact.json'));
    res.send(JSON.parse(data))
}

exports.love = (req, res) => {
    const { male, female } = req.body

    if(!male || !female) {
        return res.status(422).send({message: "Enter all details"})
    }

    if(typeof(male) !== "string" || typeof(female) !== "string") {
        return res.status(422).send({message: "Enter proper names"})
    }

    p1 = male.toLowerCase()
    p2 = female.toLowerCase()

    let common = LCS(p1, p1.length, p2, p2.length)
    let size = Math.min(p1.length, p2.length)
    let percent = Math.round((common/size)*100)
    let msg = ""

    if(percent >= 35) msg = "Made for each other"
    else if(percent > 20 && percent < 35) msg = "Good choice"
    else if(percent >= 10 && percent <= 20) msg = "A better one"
    else msg = "You should go for another one"

    if(percent > 49) percent = percent
    else percent *= 2

    res.json({percentage: percent, message: msg})
}

exports.luck = (req, res) => {
    const { name } = req.body

    if(!name) {
        return res.status(422).send({message: "Enter a name"})
    }

    if(typeof(name) !== "string") {
        return res.status(422).send({message: "Name must be a string"})
    }

    let cname = name.toLowerCase()
    let revName = cname.split("").reverse().join("");
    let lcs = LCS(cname, name.length, revName, name.length)

    let lps = name.length - lcs;

    let percent = Math.round((lps/name.length)*100)

    res.json({percentage: percent})
}

exports.stringAPI = (req, res) => {
    const { str } = req.body

    if(!str) {
        return res.status(422).send({message: "Enter a string"})
    }

    if(typeof(str) !== "string") {
        return res.status(422).send({message: "Enter proper string"})
    }
    
    var vowelsCount = 0, consonants = 0;
    var string = str.toString();

    for(var i = 0; i <= string.length - 1; i++) {
        if((string.charAt(i).match(/[aeiou]/))){       
            vowelsCount++;
        } else if((string.charAt(i).match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/))){
            consonants++;
        }
    }

    let lower = str.toLowerCase();
    let upper = str.toUpperCase();
    let spaces = Math.abs(str.length-consonants-vowelsCount);

    res.json({
        lower: lower, 
        upper: upper, 
        character: str.length, 
        vowels: vowelsCount, 
        consonants: consonants, 
        spaces: spaces
    });
}