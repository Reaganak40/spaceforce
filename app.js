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


// const http = require('http')
// const fs = require('fs')

// const server = http.createServer(function(request, response) {
//     response.writeHead(200, { 'Content-Type' : 'text/html' })
//     fs.readFile('index.html', function(error, data) {
//         if (error)
//         {
//             response.writeHead(404)
//             response.write('Error: File not found.')
//         }
//         else
//         {
//             response.write(data)
//             response.end()
//         }
//     })
    
// })

// server.listen(port, function(error) {
//     if (error)
//     {
//         console.log("Something went wrong... ", error)
//     }
//     else
//     {
//         console.log("Server listening on port", port)
//     }
// })