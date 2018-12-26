require('dotenv').config({ path: 'variables.env' });

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE: process.env.DATABASE,
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
    KEY: process.env.KEY
};