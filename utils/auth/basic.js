const { BasicStrategy } = require('passport-http');
const passport = require('passport');
const MongoDB = require("../../lib/mongo");
const bcrypt = require('bcrypt')
const mongoDB = new MongoDB();

passport.use(
    new BasicStrategy(async (email, password, done) => {
        const usuario = await mongoDB.getOne("users", {email: email});
        if (usuario == null)
            return done("Existe un error al ingresar el nombre de usuario o la contraseña", null);
        
        if (!(await bcrypt.compare(password, usuario.password)))
            return done("Existe un error al ingresar el nombre de usuario o la contraseña", null);
        
        done(null, email);
    })
);