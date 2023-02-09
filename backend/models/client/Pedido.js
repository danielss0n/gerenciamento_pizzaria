const mongoose = require('mongoose')
const {Schema} = mongoose

const Pedido = mongoose.model(
    "Pedido",
    new Schema({

        pizza: Object,
        observacoes: { type: String, required: false },
        produto: Object,
        preco_total: {
            type: Number,
            required: true
        },
        status: { type: String, required: true},
        entrega: { type: String, required: true}
        
    }, 
        { timestamps: true }, 
    ),
)

module.exports = Pedido