const Sabor = require('../../models/admin/Sabor')
const Produto = require('../../models/estoque/Produto')
const Ingrediente = require('../../models/estoque/Ingrediente')
const { Model } = require('mongoose')

module.exports = class produtosCONTROLLER {

    static async cadastrarProduto(req, res) {

        //declarar variaveis da requisição
        let { 
            nome,
            quantia_comprada,
            gastos_compra,
            preco_venda,
            categoria,
            imagem,
        } = req.body

        //declarar objeto
        const novo_produto_data = {}
        console.log(categoria)
        novo_produto_data.quantia_comprada = parseInt(quantia_comprada)
        novo_produto_data.gastos_compra = parseFloat(gastos_compra)
        novo_produto_data.preco_venda = parseFloat(preco_venda)

        //procurar o produto
        const produtos_cadastrados = await Produto.find()
        const produtos_array_nomes = produtos_cadastrados.map(({ nome }) => nome)

        //verificar se o ingrediente existe
        if(produtos_array_nomes.includes(nome)){
            res.status(500).json({mensagem:`O produto ${nome} já está cadastrado, atualize!`})
            return
        }
        //verificar se há o nome
        if(!nome){
            res.status(500).json({mensagem:`Insira pelomenos o nome do produto!`})
            return
        }

        //declarar valores default caso a requisição venha sem valores
        if(!quantia_comprada || quantia_comprada == null){
            novo_produto_data.quantia_comprada = 0
        } 
        if(!preco_venda || preco_venda == null){
            novo_produto_data.preco_venda = 0
        }
        if(!categoria || categoria == null){
            novo_produto_data.categoria = "indefinida"
        }
        if(!imagem || imagem == null){
            novo_produto_data.imagem = "default.jpg"
        }
        novo_produto_data.categoria = categoria
        
        //declarar o objeto para cadastro no db
        const produto = new Produto({
            nome,
            quantia_em_estoque: novo_produto_data.quantia_comprada,
            preco_venda: novo_produto_data.preco_venda,
            total_vendas: 0,
            categoria: novo_produto_data.categoria,
            imagem: novo_produto_data.imagem,
        })

        console.log(produto)
        //cadastro no db
        try {
            const cadastrar_produto = await produto.save()
            res.status(201).json({mensagem:"Produto cadastrado!", cadastrar_produto})
        } catch (error) {
            res.status(500).json({mensagem:error})
            return
        }

    }

    static async atualizarProduto(req, res){

        //declarar variaveis da requisição
        const id = req.params.id
        const nome = req.body.nome
        const quantia_comprada = parseInt(req.body.quantia_comprada)
        const preco_venda = parseFloat(req.body.preco_venda)
        const categoria = req.body.categoria
        const imagem = req.body.imagem

        const updated_data = {}
        let sem_nome = false;

        //verificar se o id do produto existe
        if(id.length !== 24){
            res.status(404).json({mensagem:`Produto não encontrado`})
            return
        }

        //procurar o produto
        const produto_data = await Produto.findOne({_id: id})
        const produtos_cadastrados = await Produto.find()
        const produtos_array_nomes = produtos_cadastrados.map(({ nome }) => nome)

        //pegar dados antidos
        const quantia_estoque_anterior = produto_data.quantia_em_estoque
        const gasto_total_anterior = produto_data.gasto_total
        const total_vendas_anterior = produto_data.total_vendas

        //trocar dados antigos pelos novos
        updated_data.nome = nome
        updated_data.quantia_em_estoque = quantia_estoque_anterior + quantia_comprada
        updated_data.preco_venda = preco_venda
        updated_data.total_vendas = total_vendas_anterior
        updated_data.categoria = categoria
        updated_data.imagem = imagem

        //validações
        if(!nome){
            updated_data.nome = produto_data.nome
            sem_nome = true
        }
        if(!preco_venda){
            updated_data.preco_venda = produto_data.preco_venda
        }
        if(!categoria){
            updated_data.categoria = produto_data.categoria
        }
        if(!imagem){
            updated_data.categoria = produto_data.imagem
        }

        //atualizar no db
        try {
            await Produto.findOneAndUpdate(
                {$set: updated_data},
            )

            if(sem_nome == true){
                res.status(500).json({message: `${produto_data.nome} - Atualizado!`})
                return
            } else {
                res.status(500).json({message: `${nome} - Atualizado!`})
            }
            
        } catch (error) {
            res.status(500).json({message: error})
            return
        }

    }

    static async removerProduto(req, res){

        //declarar variaveis da requisição
        const id = req.params.id
        const produto_data = await Produto.findOne({_id:id})

        //verificar se o id esta correto
        if(id.length !== 24){
            res.status(404).json({mensagem:`Produto não encontrado`})
            return
        }

        //verificar se o id pertence a coleção certa
        if(produto_data == null){
            res.status(404).json({mensagem:`Produto não encontrado`})
            return
        }

        try{
            await Produto.findOneAndDelete({_id: id})
            res.status(500).json({mensagem:`Produto ${produto_data.nome}deletado`})
        } catch(error){
            res.status(500).json({message: error})
            return
        }
        
    }
}