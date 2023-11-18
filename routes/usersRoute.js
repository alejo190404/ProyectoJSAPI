const express = require("express")
const router = express.Router();
const MongoDB = require("../lib/mongo");
const mongoDB = new MongoDB();
const passport = require('passport');
require('../utils/auth/jwt');

router.get("/", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const data = await mongoDB.getAll("users")
    const results = [];
    for await (const doc of data){
        results.push(doc);
    }
    res.status(200).json({
        results
    })
})

router.get("/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const data = await mongoDB.getOne("users", {edad: req.params.id})
    return res.status(200).json({
        data
    })
})

router.post("/", async (req, res, next) => {
    const result = await mongoDB.insertOne("users", req.body)
    return res.status(200).json({
        result
    })
})

router.put("/", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const data = await mongoDB.updateOne("users", req.body, {email: req.params.email})
    return res.status(200).json({
        data
    })
})

router.delete("/:id", passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const data = await mongoDB.deleteOne("users", {email: req.params.id})
    return res.status(200).json({
        data
    })
})

module.exports = router;