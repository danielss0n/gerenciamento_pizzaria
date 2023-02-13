const router = require('express').Router()

const clientCONTROLLER = require('./controllers/client')
const pedidoCONTROLLER = require('./controllers/pedido')
const ingredientesCONTROLLER = require('./controllers/admin/ingredientes')
const produtosCONTROLLER = require('./controllers/admin/produtos')
const saboresCONTROLLER = require('./controllers/admin/sabores')
const adminCONTROLLER = require('./controllers/admin/admin')
const verifyToken = require('./middlewares/verifyToken')

//ROTAS CLIENTE
router.get('/client', clientCONTROLLER.mostrarTudo)
router.post('/client/pedido', clientCONTROLLER.pedido)

//ROTAS ADMIN
router.post('/admin/login', adminCONTROLLER.logarAdmin)
//SABORES
router.post('/admin/cadastrarSabor', verifyToken, saboresCONTROLLER.cadastrarSabor)
router.patch('/admin/estoque/sabores/:id', /*verifyToken*/ saboresCONTROLLER.atualizarSabor)
router.delete('/admin/estoque/sabores/:id', /*verifyToken*/ saboresCONTROLLER.removerSabor)
//PRODUTOS
router.post('/admin/cadastrarProduto', /*verifyToken*/ produtosCONTROLLER.cadastrarProduto)
router.patch('/admin/estoque/produtos/:id', /*verifyToken*/ produtosCONTROLLER.atualizarProduto)
router.delete('/admin/estoque/produtos/:id', /*verifyToken*/ produtosCONTROLLER.removerProduto)
//INGREDIENTES
router.get('/admin', /*verifyToken*/ ingredientesCONTROLLER.mostrarIgredientes)
router.post('/admin/cadastrarIngrediente', /*verifyToken*/ ingredientesCONTROLLER.cadastrarIngredientesEstoque)
router.patch('/admin/cadastrarIngrediente', /*verifyToken*/ ingredientesCONTROLLER.atualizarIngredientesEstoque)
router.delete('/admin/estoque/ingredientes/:id', /*verifyToken*/ ingredientesCONTROLLER.removerIngredienteEstoque)

//ROTAS ADMIN PEDIDOS
router.get('/admin/pedidos', /*verifyToken*/ pedidoCONTROLLER.mostrarPedidos)
router.get('/admin/pedidos/:id', /*verifyToken*/ pedidoCONTROLLER.verPedido)
router.patch('/admin/pedidos/:id',/*verifyToken*/ pedidoCONTROLLER.finalizarPizza)


module.exports = router