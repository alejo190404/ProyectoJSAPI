const express = require("express")
const router = express.Router();
const MongoDB = require("../lib/mongo");
const mongoDB = new MongoDB();
const passport = require('passport');
require('../utils/auth/jwt');

router.get("/", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const data = await mongoDB.getAll("messages")
    const results = [];
    for await (const doc of data){
        results.push(doc);
    }
    res.status(200).json({
        results
    })
})

router.post("/", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const result = await mongoDB.insertOne("messages", req.body)
    return res.status(200).json({
        result
    })
})

module.exports = router;