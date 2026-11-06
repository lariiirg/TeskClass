
const router = require('express').Router();

const controller = require('../controllers/projetosController');

const {
  autenticar,
  verificarProjeto
} = require('../middlewares/auth');

router.use(autenticar);

router.get('/', controller.listar);
router.post('/', controller.criar);
router.post('/entrar', controller.entrar);

router.get(
  '/:id/membros',
  verificarProjeto,
  controller.membros
);

router.get(
  '/:id/trabalhos',
  verificarProjeto,
  controller.trabalhos
);

module.exports = router;
