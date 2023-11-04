const express = require("express")
const router = express.Router();
const MongoDB = require("../lib/mongo");
const mongoDB = new MongoDB();
const bcrypt = require('bcrypt');

router.post("/login", async (req, res, next) => {

})

router.post("/register", async (req, res, next) => {
    try {
        const userFound = await mongoDB.getOne("users", {email: req.body.email})
        if (userFound){
            return res.status(403).json({
                message: "Este usuario ya existe"
            });
        }
    
        let user = req.body;
        user.password = await bcrypt.hash(user.password, 10)
        const respuesta = await mongoDB.insertOne("users", user);

        return res.status(200).json({
            respuesta
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router