
import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView,
  StyleSheet, Alert, ActivityIndicator,
  useWindowDimensions, Platform
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const API = 'http://localhost:3000/api/trabalhos';

const inicial = {
  titulo: '',
  materia: '',
  tema: '',
  descricao: '',
  prazo: '',
  status: 'pendente'
};

function dataISO(valor) {
  if (!valor) return '';
  if (typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}/.test(valor)) {
    return valor.slice(0, 10);
  }
  return '';
}

function dataBR(valor) {
  const iso = dataISO(valor);
  if (!iso) return 'Não informado';
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function mensagem(titulo, texto) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n${texto}`);
  } else {
    Alert.alert(titulo, texto);
  }
}

export default function Trabalhos({ navigation }) {
  const { width } = useWindowDimensions();
  const desktop = width >= 900;
  const colunas = width >= 1450 ? 3 : desktop ? 2 : 1;

  const [trabalhos, setTrabalhos] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [formAberto, setFormAberto] = useState(false);
  const [form, setForm] = useState(inicial);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch(API);
      if (!resposta.ok) throw new Error('Erro HTTP ' + resposta.status);
      const dados = await resposta.json();
      if (!Array.isArray(dados)) throw new Error('Resposta inválida');
      setTrabalhos(dados);
    } catch (e) {
      setErro('Não foi possível acessar a API. Confira o servidor.');
      console.error(e);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    carregar();
  }, [carregar]));

  const alterar = (campo, valor) => {
    setForm(anterior => ({ ...anterior, [campo]: valor }));
  };

  async function cadastrar() {
    if (!form.titulo.trim() || !form.materia.trim() ||
        !form.tema.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(form.prazo)) {
      mensagem('Atenção', 'Preencha título, matéria, tema e prazo no formato AAAA-MM-DD.');
      return;
    }

    setSalvando(true);
    try {
      const resposta = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || 'Erro ao cadastrar.');
      }

      setForm(inicial);
      setFormAberto(false);
      await carregar();
      mensagem('Sucesso', 'Trabalho cadastrado no banco de dados!');
    } catch (e) {
      mensagem('Erro', e.message);
    } finally {
      setSalvando(false);
    }
  }

  const filtrados = trabalhos.filter(t => {
    const texto = `${t.titulo} ${t.materia} ${t.tema}`.toLowerCase();
    return texto.includes(busca.toLowerCase()) &&
      (filtro === 'todos' || t.status === filtro);
  });

  const filtros = [
    ['todos', 'Todos'],
    ['pendente', 'Pendentes'],
    ['andamento', 'Em andamento'],
    ['concluido', 'Concluídos']
  ];

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={[
        styles.conteudo,
        desktop && styles.desktop
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.cabecalho}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titulo}>Meus trabalhos</Text>
          <Text style={styles.subtitulo}>
            Trabalhos cadastrados no banco de dados
          </Text>
        </View>

        <Pressable
          style={styles.botaoNovo}
          onPress={() => setFormAberto(!formAberto)}
        >
          <Text style={styles.botaoNovoTexto}>
            {formAberto ? 'Cancelar' : '+ Novo trabalho'}
          </Text>
        </Pressable>
      </View>

      {formAberto && (
        <View style={styles.formCard}>
          <Text style={styles.secaoTitulo}>Cadastrar trabalho</Text>
          <Text style={styles.subtitulo}>
            Os dados serão salvos no MySQL.
          </Text>

          <View style={styles.campos}>
            {[
              ['titulo', 'Título do trabalho'],
              ['materia', 'Matéria'],
              ['tema', 'Tema'],
              ['prazo', 'Prazo (AAAA-MM-DD)'],
              ['descricao', 'Descrição']
            ].map(([campo, rotulo]) => (
              <View
                key={campo}
                style={[
                  styles.campo,
                  desktop && { width: campo === 'descricao' ? '100%' : '48%' }
                ]}
              >
                <Text style={styles.rotulo}>{rotulo}</Text>
                <TextInput
                  style={styles.input}
                  value={form[campo]}
                  onChangeText={v => alterar(campo, v)}
                  placeholder={campo === 'prazo' ? '2026-11-20' : rotulo}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            ))}
          </View>

          <Text style={styles.rotulo}>Status</Text>
          <View style={styles.filtros}>
            {[
              ['pendente', 'Pendente'],
              ['andamento', 'Em andamento'],
              ['concluido', 'Concluído']
            ].map(([valor, texto]) => (
              <Pressable
                key={valor}
                onPress={() => alterar('status', valor)}
                style={[
                  styles.filtro,
                  form.status === valor && styles.filtroAtivo
                ]}
              >
                <Text style={[
                  styles.filtroTexto,
                  form.status === valor && styles.filtroTextoAtivo
                ]}>{texto}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={styles.botaoSalvar}
            onPress={cadastrar}
            disabled={salvando}
          >
            <Text style={styles.botaoNovoTexto}>
              {salvando ? 'Salvando...' : 'Salvar no banco de dados'}
            </Text>
          </Pressable>
        </View>
      )}

      <View style={styles.painel}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por título, matéria ou tema..."
          placeholderTextColor="#9CA3AF"
          value={busca}
          onChangeText={setBusca}
        />
        <View style={styles.filtros}>
          {filtros.map(([valor, texto]) => (
            <Pressable
              key={valor}
              onPress={() => setFiltro(valor)}
              style={[
                styles.filtro,
                filtro === valor && styles.filtroAtivo
              ]}
            >
              <Text style={[
                styles.filtroTexto,
                filtro === valor && styles.filtroTextoAtivo
              ]}>{texto}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.linha}>
        <Text style={styles.secaoTitulo}>
          Trabalhos ({filtrados.length})
        </Text>
        <Pressable onPress={carregar}>
          <Text style={styles.atualizar}>↻ Atualizar</Text>
        </Pressable>
      </View>

      {carregando && <ActivityIndicator color="#DC2626" size="large" />}

      {!!erro && (
        <View style={styles.aviso}>
          <Text style={styles.erro}>{erro}</Text>
        </View>
      )}

      {!carregando && !erro && filtrados.length === 0 && (
        <View style={styles.aviso}>
          <Text style={styles.vazio}>
            Nenhum trabalho encontrado.
          </Text>
        </View>
      )}

      <View style={styles.grade}>
        {!carregando && !erro && filtrados.map(trabalho => (
          <Pressable
            key={trabalho.id}
            style={[
              styles.card,
              colunas > 1 && {
                width: colunas === 3 ? '31.5%' : '48%'
              }
            ]}
            onPress={() => navigation.navigate('Detalhes', {
              id: trabalho.id,
              titulo: trabalho.titulo,
              tema: trabalho.tema,
              prazo: dataBR(trabalho.prazo)
            })}
          >
            <View style={styles.cardTopo}>
              <Text style={styles.materia}>{trabalho.materia}</Text>
              <Text style={styles.status}>
                {trabalho.status === 'andamento'
                  ? 'Em andamento'
                  : trabalho.status === 'concluido'
                  ? 'Concluído' : 'Pendente'}
              </Text>
            </View>

            <Text style={styles.cardTitulo}>{trabalho.titulo}</Text>
            <Text style={styles.cardTema}>{trabalho.tema}</Text>

            {!!trabalho.descricao && (
              <Text style={styles.descricao} numberOfLines={2}>
                {trabalho.descricao}
              </Text>
            )}

            <View style={styles.divisor} />
            <Text style={styles.prazo}>
              ◷ Entrega: {dataBR(trabalho.prazo)}
            </Text>
            <Text style={styles.detalhes}>Ver detalhes →</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F7F8FA' },
  conteudo: { width: '100%', padding: 20, paddingBottom: 50 },
  desktop: {
    maxWidth: 1500, alignSelf: 'center',
    paddingHorizontal: 36, paddingTop: 30
  },
  cabecalho: {
    flexDirection: 'row', alignItems: 'center',
    flexWrap: 'wrap', gap: 14, marginBottom: 24
  },
  titulo: { fontSize: 28, fontWeight: '800', color: '#111827' },
  subtitulo: { color: '#6B7280', fontSize: 13, marginTop: 6 },
  botaoNovo: {
    backgroundColor: '#DC2626', paddingVertical: 14,
    paddingHorizontal: 20, borderRadius: 12
  },
  botaoNovoTexto: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
  formCard: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    padding: 22, marginBottom: 20
  },
  secaoTitulo: { fontSize: 19, fontWeight: '800', color: '#111827' },
  campos: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between', marginTop: 20
  },
  campo: { width: '100%', marginBottom: 15 },
  rotulo: {
    color: '#374151', fontSize: 12,
    fontWeight: 'bold', marginBottom: 8
  },
  input: {
    borderWidth: 1, borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB', borderRadius: 12,
    height: 49, paddingHorizontal: 14,
    color: '#111827', fontSize: 13
  },
  filtros: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 9, marginTop: 14
  },
  filtro: {
    backgroundColor: '#F3F4F6', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 10
  },
  filtroAtivo: { backgroundColor: '#FEE2E2' },
  filtroTexto: { color: '#6B7280', fontSize: 12, fontWeight: '600' },
  filtroTextoAtivo: { color: '#B91C1C' },
  botaoSalvar: {
    backgroundColor: '#DC2626', borderRadius: 12,
    padding: 15, alignItems: 'center', marginTop: 20
  },
  painel: {
    backgroundColor: '#FFFFFF', borderRadius: 20,
    padding: 20, marginBottom: 25
  },
  linha: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 17
  },
  atualizar: { color: '#DC2626', fontSize: 13, fontWeight: 'bold' },
  grade: {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'space-between', gap: 15
  },
  card: {
    width: '100%', backgroundColor: '#FFFFFF',
    borderRadius: 20, padding: 21,
    borderWidth: 1, borderColor: '#F1F2F4'
  },
  cardTopo: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: 8
  },
  materia: {
    color: '#B91C1C', backgroundColor: '#FEF2F2',
    padding: 8, borderRadius: 8, fontSize: 11, fontWeight: 'bold'
  },
  status: { color: '#D97706', fontSize: 11, fontWeight: 'bold' },
  cardTitulo: {
    fontSize: 18, fontWeight: '800',
    color: '#111827', marginTop: 20
  },
  cardTema: { color: '#6B7280', fontSize: 13, marginTop: 7 },
  descricao: { color: '#6B7280', fontSize: 12, marginTop: 10 },
  divisor: { height: 1, backgroundColor: '#F1F2F4', marginVertical: 19 },
  prazo: { color: '#DC2626', fontSize: 12, fontWeight: '600' },
  detalhes: {
    color: '#B91C1C', fontSize: 12,
    fontWeight: 'bold', marginTop: 17
  },
  aviso: {
    padding: 25, backgroundColor: '#FFFFFF',
    borderRadius: 18, marginBottom: 15
  },
  erro: { color: '#DC2626', fontSize: 13 },
  vazio: { color: '#6B7280', fontSize: 13 }
});
