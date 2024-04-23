// db.js
// connect mongoose 
const mongoose = require("mongoose");
const logger = require("./src/utils/logger")
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            autoIndex: true
        })
        logger.log({
            level: 'info',
            message: 'Connected to Mongo Atlas'
        });
    }catch (error) {
        logger.log({
            level: 'error',
            message: error
        });
    }
}
module.exports = { connectToDB };
