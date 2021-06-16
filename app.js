const express = require('express')
const router = require('./Routes')
const port = 3000
const app = express()

app.use('/', router);


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

