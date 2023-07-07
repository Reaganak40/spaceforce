const express = require('express')
const path = require('path')


const port = 3000
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res) => {
    res.status(404)
    res.send("Error: File not found.")
})

app.listen(port, () => {
    console.log("App listening on port", port)
})