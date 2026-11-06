
import { requisicao } from './api';

export function cadastrarUsuario(nome, email, senha) {
  return requisicao('/api/auth/cadastro', {
    method: 'POST',
    body: JSON.stringify({ nome, email, senha })
  });
}

export function fazerLogin(email, senha) {
  return requisicao('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha })
  });
}

export function buscarPerfil(token) {
  return requisicao('/api/auth/perfil', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function listarProjetos(token) {
  return requisicao('/api/projetos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function criarProjeto(token, nome, descricao) {
  return requisicao('/api/projetos', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ nome, descricao })
  });
}

export function entrarProjeto(token, codigo_convite) {
  return requisicao('/api/projetos/entrar', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ codigo_convite })
  });
}

export function listarMembros(token, projetoId) {
  return requisicao(`/api/projetos/${projetoId}/membros`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function listarTrabalhosProjeto(token, projetoId) {
  return requisicao(`/api/projetos/${projetoId}/trabalhos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
