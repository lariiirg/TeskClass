
const db = require('../database/conexao');
const crypto = require('crypto');

exports.criar = async (req, res, next) => {
  let conexao;

  try {
    const nome = String(req.body.nome || '').trim();
    const descricao = String(req.body.descricao || '').trim();

    if (!nome) {
      return res.status(400).json({
        erro: 'Informe o nome do projeto.'
      });
    }

    conexao = await db.getConnection();
    await conexao.beginTransaction();

    const codigo = crypto.randomBytes(12).toString('hex').toUpperCase();

    const [resultado] = await conexao.query(
      `INSERT INTO projetos
       (nome, descricao, codigo_convite, criado_por)
       VALUES (?, ?, ?, ?)`,
      [nome, descricao, codigo, req.usuario.id]
    );

    await conexao.query(
      `INSERT INTO projeto_membros
       (projeto_id, usuario_id, papel)
       VALUES (?, ?, 'administrador')`,
      [resultado.insertId, req.usuario.id]
    );

    await conexao.commit();

    res.status(201).json({
      mensagem: 'Projeto criado com sucesso!',
      projeto: {
        id: resultado.insertId,
        nome,
        descricao,
        codigo_convite: codigo,
        papel: 'administrador'
      }
    });
  } catch (erro) {
    if (conexao) await conexao.rollback();
    next(erro);
  } finally {
    if (conexao) conexao.release();
  }
};

exports.entrar = async (req, res, next) => {
  try {
    const codigo = String(
      req.body.codigo_convite || ''
    ).trim().toUpperCase();

    if (!codigo) {
      return res.status(400).json({
        erro: 'Informe o código do projeto.'
      });
    }

    const [projetos] = await db.query(
      `SELECT id, nome FROM projetos
       WHERE codigo_convite = ?`,
      [codigo]
    );

    if (!projetos.length) {
      return res.status(404).json({
        erro: 'Código de convite inválido.'
      });
    }

    const projeto = projetos[0];

    await db.query(
      `INSERT IGNORE INTO projeto_membros
       (projeto_id, usuario_id, papel)
       VALUES (?, ?, 'membro')`,
      [projeto.id, req.usuario.id]
    );

    res.json({
      mensagem: 'Você entrou no projeto!',
      projeto: {
        id: projeto.id,
        nome: projeto.nome
      }
    });
  } catch (erro) {
    next(erro);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const [projetos] = await db.query(
      `SELECT p.id, p.nome, p.descricao,
              p.codigo_convite, pm.papel
       FROM projetos p
       INNER JOIN projeto_membros pm
         ON pm.projeto_id = p.id
       WHERE pm.usuario_id = ?
       ORDER BY p.id DESC`,
      [req.usuario.id]
    );

    res.json(projetos);
  } catch (erro) {
    next(erro);
  }
};

exports.membros = async (req, res, next) => {
  try {
    const [membros] = await db.query(
      `SELECT u.id, u.nome, u.email, pm.papel
       FROM projeto_membros pm
       INNER JOIN usuarios u
         ON u.id = pm.usuario_id
       WHERE pm.projeto_id = ?
       ORDER BY pm.papel, u.nome`,
      [req.params.id]
    );

    res.json(membros);
  } catch (erro) {
    next(erro);
  }
};

exports.trabalhos = async (req, res, next) => {
  try {
    const [trabalhos] = await db.query(
      `SELECT id, titulo, materia, tema, descricao,
              DATE_FORMAT(prazo, '%d/%m/%Y') AS prazo_formatado,
              status
       FROM trabalhos
       WHERE projeto_id = ?
       ORDER BY prazo ASC`,
      [req.params.id]
    );

    res.json(trabalhos);
  } catch (erro) {
    next(erro);
  }
};
