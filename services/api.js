
import { Platform } from 'react-native';

export const API_URL = 'http://localhost:3000';

export async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, {
    ...opcoes,
    headers: {
      'Content-Type': 'application/json',
      ...(opcoes.headers || {})
    }
  });

  const texto = await resposta.text();

  let dados = {};

  if (texto) {
    try {
      dados = JSON.parse(texto);
    } catch {
      throw new Error('A API retornou uma resposta inválida.');
    }
  }

  if (!resposta.ok) {
    throw new Error(
      dados.erro || dados.mensagem || 'Erro ao acessar a API.'
    );
  }

  return dados;
}
