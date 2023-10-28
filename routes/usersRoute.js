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

module.exports = router;