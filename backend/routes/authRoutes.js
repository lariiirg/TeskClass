
const router = require('express').Router();
const controller = require('../controllers/authController');
const { autenticar } = require('../middlewares/auth');

router.post('/cadastro', controller.cadastrar);
router.post('/login', controller.login);
router.get('/perfil', autenticar, controller.perfil);

module.exports = router;
