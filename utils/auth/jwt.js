const { ExtractJwt, Strategy } = require('passport-jwt')
const passport = require('passport');
const MongoDB = require('../../lib/mongo');
const mongo = new MongoDB();
const config = require('../../config')

passport.use(
    new Strategy(
        {
            secretOrKey: config.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (payload, done) => {
            const usuario = await mongo.getOne("users", {email: payload.email});

            if (!usuario)
                return done("JWT invalido", null);

            return done(null, true);
        }
    )
)