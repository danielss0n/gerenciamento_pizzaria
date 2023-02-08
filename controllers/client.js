const Sabor = require('../models/admin/Sabor')
const Produto = require('../models/estoque/Produto')
const Pedido = require('../models/client/Pedido')

module.exports = class clientCONTROLLER {

    static async mostrarTudo(req, res) {
        
        const sabores_cadastrados = await Sabor.find()
        const produtos_cadastrados = await Produto.find()

        res.status(200).json({
            sabores_cadastrados, 
            produtos_cadastrados
        })

    }

    static async pedido(req, res) {

        //dados da requisição
        const {
            sabores,
            tamanho,
            borda,
            produto,
            observacoes,
            entrega,
        } = req.body

        //cria arrays dos sabores e produtos existentes
        const sabores_cadastrados = await Sabor.find()
        const produtos_cadastrados = await Produto.find()
        const sabores_array_nomes = sabores_cadastrados.map(({ nome }) => nome)
        const produtos_array_nomes = produtos_cadastrados.map(({ nome }) => nome)

        //verificar se ha mais de um sabor
        if(Array.isArray(sabores)){
            //quantidade de sabores na requisiçao
            if(sabores.length > 4){
                res.status(422).json({message: "Escolha entre 1 e 4 sabores"})
                return
            }

            //verificar se sabores na requisiçao existem
            const quantia_sabores = Object.keys(sabores).length
            for(let i=0; i<quantia_sabores; i++){
                if(!sabores_array_nomes.includes(sabores[i])){
                    res.status(404).json({mensagem:`Sabor ${sabores[i]} não encontrado`})
                    return
                } 
            }

            //verificar se ha sabores repetidos
            const duplicado = sabores.some((val, i) => sabores.indexOf(val) !== i);
            if(duplicado){
                res.status(404).json({mensagem:`Sabores repetidos`})
                return
            }
        }

        //verifica se só foi pedido um sabor
        if(!Array.isArray(sabores)){
            if(!sabores_array_nomes.includes(sabores)){
                res.status(404).json({mensagem:`Sabor ${sabores} não encontrado`})
                return
            } 
        }

        //verificar se produto existe
        if(!produto.includes(produtos_array_nomes)){
            res.status(404).json({mensagem:`Produto ${produto} não encontrado`})
            return
        }

        //verificar forma de retirada
        if(entrega === "Delivery"){
            entrega
        } else if (entrega === "Retirada"){
            entrega
        } else {
            res.status(422).json({message: "Escolha uma forma de retirada"})
            return
        }
        
        //procura o produto e calcular o preço do pedido
        const produto_data = await Produto.find({'nome': produto})
        const preco_produto = parseFloat(produto_data[0].preco_venda)
        const preco_pizza = 50
        const preco_total = preco_pizza + preco_produto

        //cria o objeto do pedido
        const pedido = new Pedido({
            pizza: {
                tamanho,
                sabores,
                borda,
            },
            observacoes,
            produto: {
                produto,
            },
            preco_total,
            status: "Em preparação",
            entrega,
        })

        //cadastra no db
        try {
            const novo_pedido = await pedido.save()
            res.status(201).json({mensagem:"Pedido finalizado!", novo_pedido})
        } catch (error) {
            res.status(500).json({mensagem:error})
        }
    }
}