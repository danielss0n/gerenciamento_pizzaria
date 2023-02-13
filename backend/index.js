const express = require('express')
const app = express()
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
const ROUTES = require('./index_routes')
app.use('/', ROUTES)
app.listen(5000)