const express = require('express')
const app = express()
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

const ROUTES = require('./index_routes')
app.use('/', ROUTES)

app.listen(5000)