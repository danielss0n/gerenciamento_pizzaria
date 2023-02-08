const router = require('express').Router()
const clientCONTROLLER = require('./controllers/client')
const pedidoCONTROLLER = require('./controllers/pedido')
const ingredientesCONTROLLER = require('./controllers/admin/ingredientes')
const produtosCONTROLLER = require('./controllers/admin/produtos')
const saboresCONTROLLER = require('./controllers/admin/sabores')

//ROTAS CLIENTE
router.get('/client', clientCONTROLLER.mostrarTudo)
router.post('/client/pedido', clientCONTROLLER.pedido)

//ROTAS ADMIN
//SABORES
router.post('/admin/cadastrarSabor', saboresCONTROLLER.cadastrarSabor)
router.patch('/admin/estoque/sabores/:id', saboresCONTROLLER.atualizarSabor)
router.delete('/admin/sabores/:id', saboresCONTROLLER.removerSabor)
//PRODUTOS
router.post('/admin/cadastrarProduto', produtosCONTROLLER.cadastrarProduto)
router.patch('/admin/estoque/produtos/:id', produtosCONTROLLER.atualizarProduto)
router.delete('/admin/estoque/produtos/:id', produtosCONTROLLER.removerProduto)

//INGREDIENTES
router.post('/admin/cadastrarIngrediente', ingredientesCONTROLLER.cadastrarIngredientesEstoque)
router.patch('/admin/cadastrarIngrediente', ingredientesCONTROLLER.atualizarIngredientesEstoque)
// router.delete('/admin/ingredientes/:id', ingredientesCONTROLLER.removerIngredienteEstoque)

//ROTAS ADMIN PEDIDOS
router.get('/admin/pedidos', pedidoCONTROLLER.mostrarPedidos)
router.get('/admin/pedidos/:id', pedidoCONTROLLER.verPedido)
router.patch('/admin/pedidos/:id', pedidoCONTROLLER.finalizarPizza)


module.exports = router