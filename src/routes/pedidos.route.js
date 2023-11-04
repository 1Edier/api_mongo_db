// src/routes/pedidos.route.js

const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarJWT, pedidosController.index);
router.get('/:pedidoId', authMiddleware.verificarJWT, pedidosController.getById);
router.post('/', authMiddleware.verificarJWT, pedidosController.create);
router.delete('/:pedidoId', authMiddleware.verificarJWT, pedidosController.delete);
router.patch('/:pedidoId', authMiddleware.verificarJWT, pedidosController.updateParcial);
router.put('/:pedidoId', authMiddleware.verificarJWT, pedidosController.updateCompleto);

module.exports = router;
