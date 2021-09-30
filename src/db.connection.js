const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const dbConnect = async () => {

    try {
    
        const DB = await mongoose.connect(process.env.MONGO_DB_URL, {
            auth: {
                username: process.env.MONGO_DB_USER,
                password: process.env.MONGO_DB_PASS
            },
                authSource:"admin",
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        )
        
        // const DB = await mongoose.connect('mongodb://admin:password@mongo:27017/apinode');
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect