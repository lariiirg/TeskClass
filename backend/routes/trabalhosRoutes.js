
const express = require('express');
const router = express.Router();

const controller = require('../controllers/trabalhosController');

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.post('/', controller.cadastrar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
