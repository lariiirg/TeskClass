
CREATE DATABASE IF NOT EXISTS deadline
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE deadline;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  nivel ENUM('aluno', 'professor') NOT NULL DEFAULT 'aluno',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trabalhos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  materia VARCHAR(100) NOT NULL,
  tema VARCHAR(150) NOT NULL,
  descricao TEXT,
  prazo DATE NOT NULL,
  status ENUM('pendente', 'andamento', 'concluido')
    NOT NULL DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trabalho_id INT NOT NULL,
  titulo VARCHAR(150) NOT NULL,
  responsavel VARCHAR(120) NOT NULL,
  status ENUM('pendente', 'andamento', 'concluido')
    NOT NULL DEFAULT 'pendente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trabalho_id)
    REFERENCES trabalhos(id)
    ON DELETE CASCADE
);
