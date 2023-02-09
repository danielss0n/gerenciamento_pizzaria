const Sabor = require('../../models/admin/Sabor')
const Produto = require('../../models/estoque/Produto')
const Ingrediente = require('../../models/estoque/Ingrediente')

module.exports = class saboresCONTROLLER {

    static async cadastrarSabor(req, res) {

        //declarar variaveis da requisição
        const { 
            nome,
            descricao,
            ingredientes,
            imagem
        } = req.body

        //procurando os ingredientes
        const novo_sabor_data = {}
        const ingredientes_cadastrados = await Ingrediente.find()
        const ingredientes_array_nomes = ingredientes_cadastrados.map(({ nome }) => nome)

        //adicionando variaveis no objeto
        novo_sabor_data.nome = nome
        novo_sabor_data.descricao = descricao
        novo_sabor_data.ingredientes = ingredientes
        novo_sabor_data.imagem = imagem

        //verificações obrigatórias
        if(!nome){
            res.status(422).json({mensagem:`O nome é obrigatório`})
            return
        }
        if(!ingredientes){
            res.status(422).json({mensagem:`Adicione os ingredientes`})
            return
        }

        //definir valores default
        if(!imagem){
            novo_sabor_data.imagem = "default.png"
        }
        if(!descricao){
            novo_sabor_data.descricao = "Direto do forno da nossa pizzaria"
        }
        
        //verificar os ingredientes na requisiçao existem
        const quantia_ingredientes = Object.keys(ingredientes).length
        for(let i=0; i<quantia_ingredientes; i++){
            if(!ingredientes_array_nomes.includes(ingredientes[i])){
                res.status(404).json({mensagem:`Sabor ${ingredientes[i]} não encontrado`})
                return
            } 
        }
        
        console.log(novo_sabor_data)

        //declarar o objeto para cadastro no db
        const sabor = new Sabor({
            nome: novo_sabor_data.nome,
            descricao: novo_sabor_data.descricao,
            ingredientes: novo_sabor_data.ingredientes,
            preco:10,
            imagem: novo_sabor_data.imagem = imagem,
        })

        //cadastro no db
        try {
            const cadastrar_sabor = await sabor.save()
            res.status(201).json({mensagem:"Sabor cadastrado!", cadastrar_sabor}) 
        } catch (error) {
            res.status(500).json({mensagem:error})
        }

    }

    static async atualizarSabor(req, res) {

        //declarar variaveis da requisição
        const id = req.params.id
        const nome = req.body.nome
        const descricao = req.body.descricao
        const ingredientes = req.body.ingredientes
        const preco = parseFloat(req.body.preco)
        const imagem = req.body.imagem

        //verificar se o id do produto existe
        if(id.length !== 24){
            res.status(404).json({mensagem:`Produto não encontrado`})
            return
        }

        //procurar o sabor const pedido = await Pedido.findOne({_id: id})
        const sabor_data = await Sabor.findOne({_id: id})
        const sabores_cadastrados = await Sabor.find()
        const sabores_array_nomes = sabores_cadastrados.map(({ nome }) => nome)
        //objeto dos dados atualizados que será preenchido
        const updated_data = {}
        
        //trocar dados antigos pelos novos
        updated_data.nome = nome
        updated_data.descricao = descricao
        updated_data.ingredientes = ingredientes
        updated_data.preco = preco
        updated_data.imagem = imagem

        console.log(updated_data)
        //validações
        if(!nome){
            res.status(422).json({message: `O nome é obrigatório`})
            return
        }
        if(!ingredientes){
            res.status(422).json({message: `Os ingredientes são obrigatórios`})
            return
        }
        if(!preco){
            res.status(422).json({message: `O preco é obrigatório`})
            return
        }

        //verificar se os ingredientes existem
        const ingredientes_cadastrados = await Ingrediente.find()
        const ingredientes_array_nomes = ingredientes_cadastrados.map(({ nome }) => nome)
        
        if(Array.isArray(ingredientes)){
            const quantia_ingredientes = Object.keys(ingredientes).length

            for(let i=0; i<quantia_ingredientes; i++){
                if(!ingredientes_array_nomes.includes(ingredientes[i])){
                    res.status(404).json({mensagem:`Ingrediente ${ingredientes[i]} não encontrado`})
                    return
                } 
            }
        }

        //definir valores default
        if(!imagem){
            updated_data.imagem = "default.png"
        }
        if(!descricao){
            updated_data.descricao = "Direto do forno da nossa pizzaria"
        }

        //atualizar no db
        try {
            await Sabor.findOneAndUpdate(
                {$set: updated_data},
            )
            res.status(500).json({message: `${nome} - Atualizado!`})
        } catch (error) {
            res.status(500).json({message: error})
            return
        }

    }

    static async removerSabor(req, res) {

        //declarar variaveis da requisição
        const id = req.params.id
        const sabor_data = await Sabor.findOne({_id:id})

        //verificar se o id esta correto
        if(id.length !== 24){
            res.status(404).json({mensagem:`Sabor não encontrado`})
            return
        }

        //verificar se o id pertence a coleção certa
        if(sabor_data == null){
            res.status(404).json({mensagem:`Sabor não encontrado`})
            return
        }

        try{
            await Sabor.findOneAndDelete({_id: id})
            res.status(500).json({mensagem:`Sabor ${sabor_data.nome} deletado`})
        } catch(error){
            res.status(500).json({message: error})
            return
        }
        
    }
    
}