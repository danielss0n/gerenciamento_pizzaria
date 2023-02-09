const mongoose = require('../../database/connect')
const {Schema} = mongoose

const Sabor = mongoose.model(
    "Sabore",
    new Schema({
        
        nome: { type: String, required: true },
        descricao: { type: String, required: true },
        ingredientes: { type: Array, required: true },
        preco: { type: Number, required: true },
        imagem: { type: String, required: true }
        
    },),
)

module.exports = Sabor