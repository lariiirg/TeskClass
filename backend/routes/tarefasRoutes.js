
const express = require('express');
const router = express.Router();

const controller = require('../controllers/tarefasController');

router.get('/trabalho/:trabalhoId', controller.listarPorTrabalho);
router.post('/', controller.cadastrar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
