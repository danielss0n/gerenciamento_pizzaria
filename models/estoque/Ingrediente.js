const mongoose = require('mongoose')
const {Schema} = mongoose

const Ingrediente = mongoose.model(
    "Ingrediente",
    new Schema({

        nome: { type: String, required: true },
        quantia_em_estoque: { type: Number, required: true },
        quantia_gasta_por_pizza: { type: Number, required: true },
        gasto_total: { type: Number, required: true },
        
    }, ),
)

module.exports = Ingrediente