require('dotenv').config();

const config = {
    MONGO_USER : process.env.MONGO_USER,
    MONGO_PASSWWORD : process.env.MONGO_PASSWWORD
}

module.exports = config;