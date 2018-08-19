const express = require('express')
const cors = require('cors')
const path = require('path')

const client = express()
client.use(cors())
client.use(express.static('public'))

// send View
client.get(/\/[0-9]+$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/View.html'))
})

// send Main
client.get(/\/Info|\/Bracket/i, (req, res) => {
    if (req.url[req.url.length - 1] === '/') {
        res.redirect('/Info')
    } else {
        res.sendFile(path.join(__dirname, 'public/Main.html'))
    }
})

client.get('*', (req, res) => {
    res.redirect('/Info')
})

// wake me up inside
client.get('/wake/me/up/inside', (req, res) => {
    res.send({
        wake:'me',
        up:'inside'
    })
})

setInterval(() => {
    fetch('https://ezbracketapi.herokuapp.com/wake/me/up/inside')
    .catch(() => console.log('gg'))
}, 1500000)

const PORT = process.env.PORT || 1337
client.listen(PORT)