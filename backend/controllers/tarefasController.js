
const db = require('../database/conexao');

const statusValidos = ['pendente', 'andamento', 'concluido'];

async function listarPorTrabalho(req, res) {
  try {
    const [tarefas] = await db.query(
      `SELECT * FROM tarefas
       WHERE trabalho_id = ?
       ORDER BY id ASC`,
      [req.params.trabalhoId]
    );

    res.json(tarefas);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar tarefas.' });
  }
}

async function cadastrar(req, res) {
  const { trabalho_id, titulo, responsavel, status = 'pendente' } = req.body;

  if (
    !Number.isInteger(Number(trabalho_id)) ||
    Number(trabalho_id) <= 0 ||
    typeof titulo !== 'string' || !titulo.trim() ||
    typeof responsavel !== 'string' || !responsavel.trim() ||
    !statusValidos.includes(status)
  ) {
    return res.status(400).json({ erro: 'Dados da tarefa inválidos.' });
  }

  try {
    const [trabalhos] = await db.query(
      'SELECT id FROM trabalhos WHERE id = ?',
      [trabalho_id]
    );

    if (trabalhos.length === 0) {
      return res.status(404).json({ erro: 'Trabalho não encontrado.' });
    }

    const [resultado] = await db.query(
      `INSERT INTO tarefas
       (trabalho_id, titulo, responsavel, status)
       VALUES (?, ?, ?, ?)`,
      [trabalho_id, titulo.trim(), responsavel.trim(), status]
    );

    res.status(201).json({
      mensagem: 'Tarefa cadastrada com sucesso!',
      id: resultado.insertId
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao cadastrar tarefa.' });
  }
}

async function atualizar(req, res) {
  const { titulo, responsavel, status } = req.body;

  if (
    typeof titulo !== 'string' || !titulo.trim() ||
    typeof responsavel !== 'string' || !responsavel.trim() ||
    !statusValidos.includes(status)
  ) {
    return res.status(400).json({ erro: 'Dados da tarefa inválidos.' });
  }

  try {
    const [resultado] = await db.query(
      `UPDATE tarefas
       SET titulo = ?, responsavel = ?, status = ?
       WHERE id = ?`,
      [titulo.trim(), responsavel.trim(), status, req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    res.json({ mensagem: 'Tarefa atualizada com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao atualizar tarefa.' });
  }
}

async function excluir(req, res) {
  try {
    const [resultado] = await db.query(
      'DELETE FROM tarefas WHERE id = ?',
      [req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada.' });
    }

    res.json({ mensagem: 'Tarefa excluída com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao excluir tarefa.' });
  }
}

module.exports = {
  listarPorTrabalho,
  cadastrar,
  atualizar,
  excluir
};
