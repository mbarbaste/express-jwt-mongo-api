const app = require('./app')
const dotenv = require('dotenv')

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(app.get("name"), `on http://localhost:${process.env.PORT}`)
})