
const jwt = require('jsonwebtoken');
const db = require('../database/conexao');

function autenticar(req, res, next) {
  const authorization = req.headers.authorization || '';
  const [tipo, token] = authorization.split(' ');

  if (tipo !== 'Bearer' || !token) {
    return res.status(401).json({
      erro: 'Faça login para continuar.'
    });
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = {
      id: Number(dados.id),
      nome: dados.nome
    };

    next();
  } catch (erro) {
    return res.status(401).json({
      erro: 'Sessão inválida ou expirada.'
    });
  }
}

async function verificarProjeto(req, res, next) {
  try {
    const projetoId = Number(req.params.projetoId || req.params.id);

    if (!Number.isInteger(projetoId) || projetoId <= 0) {
      return res.status(400).json({
        erro: 'Projeto inválido.'
      });
    }

    const [membros] = await db.query(
      `SELECT papel FROM projeto_membros
       WHERE projeto_id = ? AND usuario_id = ?`,
      [projetoId, req.usuario.id]
    );

    if (!membros.length) {
      return res.status(403).json({
        erro: 'Você não participa deste projeto.'
      });
    }

    req.papelProjeto = membros[0].papel;
    next();
  } catch (erro) {
    next(erro);
  }
}

function somenteAdmin(req, res, next) {
  if (req.papelProjeto !== 'administrador') {
    return res.status(403).json({
      erro: 'Somente o administrador pode realizar esta ação.'
    });
  }

  next();
}

module.exports = {
  autenticar,
  verificarProjeto,
  somenteAdmin
};
