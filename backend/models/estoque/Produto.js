const mongoose = require('../../database/connect')
const {Schema} = mongoose

const Produto = mongoose.model(
    "Produto",
    new Schema({
        
        nome: { type: String, required: true },
        quantia_em_estoque: { type: Number, required: true },
        preco_venda: { type: Number, required: true },
        total_vendas:{ type: Number, required: true },
        categoria: { type: String, required: true },
        imagem: { type: String, required: true },
        

    },),
)

module.exports = Produto