const Sabor = require('../models/admin/Sabor')
const Produto = require('../models/estoque/Produto')
const Pedido = require('../models/client/Pedido')

module.exports = class clientCONTROLLER {


    static async mostrarPedidos(req, res) {
        
        const pedidos_cadastrados = await Pedido.find()
        res.status(200).json({
            pedidos
        })

    }

    static async verPedido(req, res) {
        
        //buscar id nos parametros
        const id = req.params.id
        const pedido = await Pedido.findOne({_id: id})

        //mandar json do pedido
        res.status(200).json({
            pedido
        })

    }

    static async finalizarPizza(req, res) {
        
        //buscar id nos parametros
        const id = req.params.id
        const pedido = await Pedido.findOne({_id: id})

        //verificar tipo de entrega
        const updated_data = {}
        if(pedido.entrega === "Delivery"){
            updated_data.status = "Pizza sendo entregue pelo Delivery"
        }
        if(pedido.entrega === "Retirada"){
            updated_data.status = "Pizza pronta para ser retirada"
        }

        //cadastrar no bd
        try {
            await Pedido.findOneAndUpdate(
                {_id: id},
                {$set: updated_data},
            )
            res.status(500).json({message: `Pizza feita!`})
        } catch (error) {
            res.status(500).json({message: error})
            return
        }

    }
}