const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const api = express.Router()

api.get('/entreprises', (req, res) => {
    res.json({success: true, message: 'Hello World'})
})

app.use('/api', api)

const port = 4201

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})