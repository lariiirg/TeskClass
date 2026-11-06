
const db = require('../database/conexao');

const statusValidos = ['pendente', 'andamento', 'concluido'];

function validarTrabalho(dados) {
  const { titulo, materia, tema, prazo, status } = dados;

  if (
    typeof titulo !== 'string' || !titulo.trim() ||
    typeof materia !== 'string' || !materia.trim() ||
    typeof tema !== 'string' || !tema.trim() ||
    typeof prazo !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(prazo)
  ) {
    return 'Preencha título, matéria, tema e prazo válido (AAAA-MM-DD).';
  }

  const data = new Date(`${prazo}T12:00:00Z`);
  if (
    Number.isNaN(data.getTime()) ||
    data.toISOString().slice(0, 10) !== prazo
  ) {
    return 'A data informada não existe.';
  }

  if (status !== undefined && !statusValidos.includes(status)) {
    return 'Status inválido.';
  }

  return null;
}

async function listar(req, res) {
  try {
    const [trabalhos] = await db.query(
      'SELECT * FROM trabalhos ORDER BY prazo ASC, id DESC'
    );
    res.json(trabalhos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar trabalhos.' });
  }
}

async function buscarPorId(req, res) {
  try {
    const [trabalhos] = await db.query(
      'SELECT * FROM trabalhos WHERE id = ?',
      [req.params.id]
    );

    if (trabalhos.length === 0) {
      return res.status(404).json({ erro: 'Trabalho não encontrado.' });
    }

    res.json(trabalhos[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar trabalho.' });
  }
}

async function cadastrar(req, res) {
  const erroValidacao = validarTrabalho(req.body);

  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  const {
    titulo, materia, tema, descricao = '',
    prazo, status = 'pendente'
  } = req.body;

  try {
    const [resultado] = await db.query(
      `INSERT INTO trabalhos
       (titulo, materia, tema, descricao, prazo, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        titulo.trim(), materia.trim(), tema.trim(),
        descricao || '', prazo, status
      ]
    );

    res.status(201).json({
      mensagem: 'Trabalho cadastrado com sucesso!',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao cadastrar trabalho.' });
  }
}

async function atualizar(req, res) {
  const erroValidacao = validarTrabalho(req.body);

  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  const {
    titulo, materia, tema, descricao = '',
    prazo, status = 'pendente'
  } = req.body;

  try {
    const [resultado] = await db.query(
      `UPDATE trabalhos
       SET titulo = ?, materia = ?, tema = ?,
           descricao = ?, prazo = ?, status = ?
       WHERE id = ?`,
      [
        titulo.trim(), materia.trim(), tema.trim(),
        descricao || '', prazo, status, req.params.id
      ]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Trabalho não encontrado.' });
    }

    res.json({ mensagem: 'Trabalho atualizado com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar trabalho.' });
  }
}

async function excluir(req, res) {
  try {
    const [resultado] = await db.query(
      'DELETE FROM trabalhos WHERE id = ?',
      [req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Trabalho não encontrado.' });
    }

    res.json({ mensagem: 'Trabalho excluído com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao excluir trabalho.' });
  }
}

module.exports = {
  listar,
  buscarPorId,
  cadastrar,
  atualizar,
  excluir
};
