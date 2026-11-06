
USE deadline;

CREATE TABLE IF NOT EXISTS projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(160) NOT NULL,
    descricao TEXT,
    codigo_convite VARCHAR(32) NOT NULL UNIQUE,
    criado_por INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (criado_por)
        REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS projeto_membros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    projeto_id INT NOT NULL,
    usuario_id INT NOT NULL,
    papel ENUM('administrador', 'membro')
        NOT NULL DEFAULT 'membro',
    entrou_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unico_membro (projeto_id, usuario_id),
    FOREIGN KEY (projeto_id)
        REFERENCES projetos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tarefas_responsaveis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tarefa_id INT NOT NULL,
    usuario_id INT NOT NULL,
    UNIQUE KEY unico_responsavel (tarefa_id, usuario_id),
    FOREIGN KEY (tarefa_id)
        REFERENCES tarefas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id) ON DELETE CASCADE
);

SET @coluna_projeto_existe = (
    SELECT COUNT(*)
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'trabalhos'
      AND COLUMN_NAME = 'projeto_id'
);

SET @comando = IF(
    @coluna_projeto_existe = 0,
    'ALTER TABLE trabalhos ADD COLUMN projeto_id INT NULL',
    'SELECT 1'
);

PREPARE stmt FROM @comando;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT 'Estrutura de projetos atualizada' AS resultado;
