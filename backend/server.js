
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./database/conexao');

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API Deadline funcionando' });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projetos', require('./routes/projetosRoutes'));

app.use('/api/trabalhos', require('./routes/trabalhosRoutes'));
app.use('/api/tarefas', require('./routes/tarefasRoutes'));

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error('Erro na API:', err);
  res.status(500).json({
    erro: 'Erro interno no servidor.'
  });
});

(async () => {
  try {
    const conexao = await db.getConnection();
    console.log('MySQL conectado!');
    conexao.release();

    app.listen(PORT, () => {
      console.log(
        `API Deadline funcionando em http://localhost:${PORT}`
      );
    });
  } catch (erro) {
    console.error(
      'Não foi possível conectar ao MySQL:',
      erro.message
    );
    process.exitCode = 1;
    await db.end();
  }
})();
