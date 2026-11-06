
const db = require('../database/conexao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function gerarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
}

exports.cadastrar = async (req, res, next) => {
  try {
    const nome = String(req.body.nome || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const senha = String(req.body.senha || '');

    if (!nome || !email || senha.length < 8) {
      return res.status(400).json({
        erro: 'Informe nome, e-mail e senha de pelo menos 8 caracteres.'
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        erro: 'E-mail inválido.'
      });
    }

    const [existentes] = await db.query(
      'SELECT id FROM usuarios WHERE email = ?',
      [email]
    );

    if (existentes.length) {
      return res.status(409).json({
        erro: 'Este e-mail já está cadastrado.'
      });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    const [resultado] = await db.query(
      `INSERT INTO usuarios
       (nome, email, senha_hash, nivel)
       VALUES (?, ?, ?, 'aluno')`,
      [nome, email, senhaHash]
    );

    const usuario = {
      id: resultado.insertId,
      nome,
      email
    };

    res.status(201).json({
      mensagem: 'Conta criada com sucesso!',
      usuario,
      token: gerarToken(usuario)
    });
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        erro: 'Este e-mail já está cadastrado.'
      });
    }
    next(erro);
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const senha = String(req.body.senha || '');

    const [usuarios] = await db.query(
      `SELECT id, nome, email, senha_hash
       FROM usuarios WHERE email = ?`,
      [email]
    );

    if (!usuarios.length) {
      return res.status(401).json({
        erro: 'E-mail ou senha incorretos.'
      });
    }

    const usuario = usuarios[0];
    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha_hash
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: 'E-mail ou senha incorretos.'
      });
    }

    const dados = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };

    res.json({
      mensagem: 'Login realizado com sucesso!',
      usuario: dados,
      token: gerarToken(dados)
    });
  } catch (erro) {
    next(erro);
  }
};

exports.perfil = async (req, res, next) => {
  try {
    const [usuarios] = await db.query(
      'SELECT id, nome, email FROM usuarios WHERE id = ?',
      [req.usuario.id]
    );

    if (!usuarios.length) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    res.json(usuarios[0]);
  } catch (erro) {
    next(erro);
  }
};
