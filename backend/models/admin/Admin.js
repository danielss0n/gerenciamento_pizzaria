const mongoose = require('../../database/connect')
const {Schema} = mongoose

const Admin = mongoose.model(
    "Admin",
    new Schema({
        
        nome: { type: String, required: true },
        senha1: { type: String, required: true },
        senha2: { type: String, required: true },
        
    },),
)

module.exports = Admin