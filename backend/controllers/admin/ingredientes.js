const Sabor = require('../../models/admin/Sabor')
const Produto = require('../../models/estoque/Produto')
const Ingrediente = require('../../models/estoque/Ingrediente')

module.exports = class ingredientesCONTROLLER {


    static async mostrarIgredientes(req, res) {
        const ingredientes_cadastrados = await Ingrediente.find()
        res.status(200).json({
            ingredientes_cadastrados
        })
    }

    static async cadastrarIngredientesEstoque(req, res) {

        //declarar variaveis da requisição
        const { 
            nome,
            quantia_comprada,
            gastos_compra,
            quantia_gasta_por_pizza
        } = req.body

        //procurar o ingrediente
        const ingredientes_cadastrados = await Ingrediente.find()
        const ingredientes_array_nomes = ingredientes_cadastrados.map(({ nome }) => nome)

        //verificar se o ingrediente existe
        if(ingredientes_array_nomes.includes(nome)){
            res.status(500).json({mensagem:`O ingrediente ${nome} já está cadastrado, atualize!`})
            return
        }

        //declarar objeto
        const novo_produto_data = {}
        novo_produto_data.quantia_comprada = parseInt(quantia_comprada)
        novo_produto_data.gastos_compra = parseFloat(gastos_compra)
        novo_produto_data.quantia_gasta_por_pizza = parseFloat(quantia_gasta_por_pizza)

        //declarar valores default caso a requisição venha sem valores
        if(!quantia_comprada || quantia_comprada === null){
            novo_produto_data.quantia_comprada= 0
        } 
        if(!gastos_compra || gastos_compra === null){
            novo_produto_data.gastos_compra = 0
        }
        if(!quantia_gasta_por_pizza || quantia_gasta_por_pizza === null){
            novo_produto_data.quantia_gasta_por_pizza = 0
        }
        
        //declarar objeto para cadastrar no db
        const novo_ingrediente = new Ingrediente({
            nome,
            quantia_em_estoque: novo_produto_data.quantia_comprada,
            gasto_total: novo_produto_data.gastos_compra,
            quantia_gasta_por_pizza: novo_produto_data.quantia_gasta_por_pizza
        })        

        //cadastrar no db
        try {
            const cadastrar_produto = await novo_ingrediente.save()
            res.status(201).json({mensagem:"Produto cadastrado!", cadastrar_produto})
        } catch (error) {
            res.status(500).json({mensagem:error})
            return
        }

    }

    static async atualizarIngredientesEstoque(req, res){

        //declarar variaveis da requisição
        const nome = req.body.nome
        const quantia_comprada = parseInt(req.body.quantia_comprada)
        const gastos_compra = parseFloat(req.body.gastos_compra)
        const quantia_gasta_por_pizza = parseFloat(req.body.quantia_gasta_por_pizza)

        //procurar o ingrediente
        const ingrediente_data = await Ingrediente.find({"nome": nome})
        const ingredientes_cadastrados = await Ingrediente.find()
        const ingredientes_array_nomes = ingredientes_cadastrados.map(({ nome }) => nome)
        //objeto dos dados atualizados que será preenchido
        const updated_data = {}
        
        //verificar se o ingrediente existe
        if(!ingredientes_array_nomes.includes(nome)){
            res.status(404).json({mensagem:`Ingrediente ${nome} não existe`})
            return
        }

        //pegar dados antidos
        const quantia_estoque_antiga = ingrediente_data[0].quantia_em_estoque
        const gasto_total_antigo = ingrediente_data[0].gasto_total
        
        //somar dados antigos com os novos
        updated_data.quantia_em_estoque = quantia_comprada + quantia_estoque_antiga
        updated_data.quantia_gasta_por_pizza = quantia_gasta_por_pizza
        updated_data.gasto_total = gastos_compra + gasto_total_antigo

        //verificar se a requisiçao esta faltando algo
        if(isNaN(quantia_comprada) || quantia_comprada == undefined){
            res.status(422).json({message: `Quantia comprada é obrigatório`})
            return
        }
        if(isNaN(gastos_compra) || gastos_compra == undefined){
            res.status(422).json({message: `Gastos da compra é obrigatório`})
            return
        }

        //preço gastado não é necessario
        if(isNaN(quantia_gasta_por_pizza) || quantia_gasta_por_pizza == undefined){
            updated_data.quantia_gasta_por_pizza = ingrediente_data[0].quantia_gasta_por_pizza
        }

        //atualizar no db
        try {
            await Ingrediente.findOneAndUpdate(
                {nome: nome},
                {$set: updated_data},
            )
            res.status(500).json({message: `${nome} - Atualizado!`})
        } catch (error) {
            res.status(500).json({message: error})
            return
        }

    }

    static async removerIngredienteEstoque(req, res){

        //declarar variaveis da requisição
        const id = req.params.id
        const ingrediente_data = await Ingrediente.findOne({_id:id})

        //verificar se o id esta correto
        if(id.length !== 24){
            res.status(404).json({mensagem:`Ingrediente não encontrado`})
            return
        }

        //verificar se o id pertence a coleção certa
        if(ingrediente_data == null){
            res.status(404).json({mensagem:`Ingrediente não encontrado`})
            return
        }

        try{
            await Ingrediente.findOneAndDelete({_id: id})
            res.status(500).json({mensagem:`Ingrediente ${ingrediente_data.nome} deletado`})
        } catch(error){
            res.status(500).json({message: error})
            return
        }
                
    }

}