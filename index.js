const express = require("express");
const app = express();

//Rutas
const usersRouter = require('./routes/usersRoute');

app.use('/users', usersRouter)

app.listen(3000, () => {
    console.log("El servidor está escuchando en http://localhost:3000")
})