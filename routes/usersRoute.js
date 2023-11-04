const express = require("express")
const router = express.Router();
const MongoDB = require("../lib/mongo");
const mongoDB = new MongoDB();

router.get("/", async (req, res, next) => {
    console.log("Estamos en el primer MD")
    const data = await mongoDB.getAll("users")
    const results = [];
    for await (const doc of data){
        results.push(doc);
    }
    res.status(200).json({
        results
    })
})

router.get("/:id", async (req, res, next) => {
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

router.put("/", async (req, res, next) => {
    const data = await mongoDB.updateOne("users", req.body, {email: req.params.email})
    return res.status(200).json({
        data
    })
})

router.delete("/:id", async (req, res, next) => {
    const data = await mongoDB.deleteOne("users", {email: req.params.id})
    return res.status(200).json({
        data
    })
})

module.exports = router;