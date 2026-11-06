
import React, { useState, useCallback } from 'react';
import {
  View, Text, Pressable, ScrollView,
  StyleSheet, useWindowDimensions, ActivityIndicator
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const API = 'http://localhost:3000/api/trabalhos';

function dataBR(valor) {
  if (!valor) return 'Não informado';
  const iso = String(valor).slice(0, 10);
  const [ano, mes, dia] = iso.split('-');
  if (!dia) return iso;
  return `${dia}/${mes}/${ano}`;
}

function diasAte(valor) {
  if (!valor) return Infinity;
  const iso = String(valor).slice(0, 10);
  const data = new Date(`${iso}T12:00:00`);
  if (isNaN(data.getTime())) return Infinity;
  const hoje = new Date();
  hoje.setHours(12, 0, 0, 0);
  return Math.round((data - hoje) / 86400000);
}

export default function Inicio({ navigation }) {
  const { width } = useWindowDimensions();
  const desktop = width >= 900;
  const duasColunas = width >= 1150;

  const [trabalhos, setTrabalhos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch(API);
      if (!resposta.ok) throw new Error('Erro ao consultar API');
      const dados = await resposta.json();
      if (!Array.isArray(dados)) throw new Error('Dados inválidos');
      setTrabalhos(dados);
    } catch (e) {
      console.error(e);
      setErro('Não foi possível carregar os trabalhos do banco.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    carregar();
  }, [carregar]));

  const andamento = trabalhos.filter(
    t => t.status === 'andamento'
  ).length;

  const concluidos = trabalhos.filter(
    t => t.status === 'concluido'
  ).length;

  const proximos = trabalhos.filter(t => {
    const dias = diasAte(t.prazo);
    return dias >= 0 && dias <= 7 && t.status !== 'concluido';
  }).length;

  const entregas = [...trabalhos]
    .filter(t => t.status !== 'concluido')
    .sort((a, b) =>
      String(a.prazo).localeCompare(String(b.prazo))
    )
    .slice(0, 5);

  function abrir(trabalho) {
    navigation.navigate('Detalhes', {
      id: trabalho.id,
      titulo: trabalho.titulo,
      tema: trabalho.tema,
      prazo: dataBR(trabalho.prazo)
    });
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={[
        styles.conteudo,
        desktop && styles.desktop
      ]}
    >
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.titulo}>Visão geral</Text>
          <Text style={styles.subtitulo}>
            Acompanhe seus trabalhos escolares
          </Text>
        </View>
        <Pressable style={styles.avatar}
          onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.avatarTexto}>A</Text>
        </Pressable>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerEtiqueta}>DEADLINE</Text>
        <Text style={styles.bannerTitulo}>Olá, estudante! 👋</Text>
        <Text style={styles.bannerDescricao}>
          Seus trabalhos escolares organizados em um só lugar.
          Acompanhe os prazos e as atividades.
        </Text>
        <Pressable style={styles.botao}
          onPress={() => navigation.navigate('Trabalhos')}>
          <Text style={styles.botaoTexto}>Ver meus trabalhos →</Text>
        </Pressable>
      </View>

      <View style={styles.estatisticas}>
        {[
          ['Em andamento', andamento, '#DC2626'],
          ['Concluídos', concluidos, '#059669'],
          ['Perto do prazo', proximos, '#D97706']
        ].map(([nome, numero, cor]) => (
          <View key={nome} style={styles.estatistica}>
            <Text style={[styles.numero, { color: cor }]}>
              {numero}
            </Text>
            <Text style={styles.estatisticaTexto}>{nome}</Text>
          </View>
        ))}
      </View>

      {carregando && <ActivityIndicator color="#DC2626" size="large" />}
      {!!erro && <Text style={styles.erro}>{erro}</Text>}

      <View style={[
        styles.secoes,
        duasColunas && styles.secoesDesktop
      ]}>
        <View style={styles.secao}>
          <View style={styles.secaoCabecalho}>
            <Text style={styles.secaoTitulo}>Meus trabalhos</Text>
            <Pressable onPress={() => navigation.navigate('Trabalhos')}>
              <Text style={styles.verTodos}>Ver todos →</Text>
            </Pressable>
          </View>

          {!carregando && !erro && trabalhos.length === 0 && (
            <Text style={styles.vazio}>
              Nenhum trabalho cadastrado ainda.
            </Text>
          )}

          <View style={styles.grade}>
            {trabalhos.slice(0, 4).map(trabalho => (
              <Pressable
                key={trabalho.id}
                style={[
                  styles.card,
                  desktop && { flexBasis: '45%', flexGrow: 1 }
                ]}
                onPress={() => abrir(trabalho)}
              >
                <Text style={styles.tag}>{trabalho.materia}</Text>
                <Text style={styles.cardTitulo}>{trabalho.titulo}</Text>
                <Text style={styles.cardTema}>{trabalho.tema}</Text>
                <View style={styles.divisor} />
                <Text style={styles.prazo}>
                  ◷ Entrega: {dataBR(trabalho.prazo)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Próximas entregas</Text>
          {entregas.length === 0 && !carregando && !erro && (
            <Text style={styles.vazio}>
              Nenhuma entrega pendente.
            </Text>
          )}

          {entregas.map(trabalho => (
            <Pressable
              key={trabalho.id}
              style={styles.entrega}
              onPress={() => abrir(trabalho)}
            >
              <View style={styles.dataBox}>
                <Text style={styles.dataTexto}>
                  {dataBR(trabalho.prazo).slice(0, 5)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.entregaTitulo}>{trabalho.titulo}</Text>
                <Text style={styles.entregaSubtitulo}>
                  {trabalho.materia} · {trabalho.tema}
                </Text>
              </View>
              <Text style={styles.seta}>›</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F7F8FA' },
  conteudo: { width: '100%', padding: 20, paddingBottom: 45 },
  desktop: {
    maxWidth: 1500, alignSelf: 'center',
    paddingHorizontal: 36, paddingTop: 30
  },
  cabecalho: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 23
  },
  titulo: { fontSize: 28, fontWeight: '800', color: '#111827' },
  subtitulo: { color: '#6B7280', fontSize: 13, marginTop: 6 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#FEE2E2',
    alignItems: 'center', justifyContent: 'center'
  },
  avatarTexto: { color: '#DC2626', fontWeight: 'bold', fontSize: 18 },
  banner: {
    backgroundColor: '#DC2626', borderRadius: 23, padding: 29
  },
  bannerEtiqueta: {
    color: '#FECACA', fontSize: 11,
    letterSpacing: 2, fontWeight: 'bold'
  },
  bannerTitulo: {
    color: '#FFFFFF', fontSize: 30,
    fontWeight: '800', marginTop: 13
  },
  bannerDescricao: {
    color: '#FEE2E2', fontSize: 14,
    lineHeight: 22, marginTop: 9, maxWidth: 500
  },
  botao: {
    alignSelf: 'flex-start', backgroundColor: '#FFFFFF',
    borderRadius: 12, padding: 14, marginTop: 22
  },
  botaoTexto: { color: '#B91C1C', fontWeight: 'bold', fontSize: 13 },
  estatisticas: { flexDirection: 'row', gap: 12, marginTop: 18 },
  estatistica: {
    flex: 1, minWidth: 0, backgroundColor: '#FFFFFF',
    borderRadius: 18, padding: 20
  },
  numero: { fontSize: 29, fontWeight: '800' },
  estatisticaTexto: { color: '#6B7280', fontSize: 12, marginTop: 9 },
  secoes: { gap: 22, marginTop: 29 },
  secoesDesktop: { flexDirection: 'row', alignItems: 'flex-start' },
  secao: { flex: 1, minWidth: 0 },
  secaoCabecalho: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center'
  },
  secaoTitulo: {
    color: '#111827', fontSize: 19,
    fontWeight: '800', marginBottom: 16
  },
  verTodos: { color: '#DC2626', fontSize: 12, fontWeight: 'bold' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '100%', backgroundColor: '#FFFFFF',
    borderRadius: 19, padding: 19
  },
  tag: {
    color: '#B91C1C', backgroundColor: '#FEF2F2',
    alignSelf: 'flex-start', padding: 8,
    borderRadius: 8, fontSize: 11, fontWeight: 'bold'
  },
  cardTitulo: {
    color: '#111827', fontSize: 16,
    fontWeight: 'bold', marginTop: 15
  },
  cardTema: { color: '#6B7280', fontSize: 12, marginTop: 7 },
  divisor: { height: 1, backgroundColor: '#F1F2F4', marginVertical: 17 },
  prazo: { color: '#DC2626', fontSize: 12, fontWeight: '600' },
  entrega: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 15, marginBottom: 11, gap: 12
  },
  dataBox: {
    width: 57, height: 55, borderRadius: 11,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center', alignItems: 'center'
  },
  dataTexto: { color: '#DC2626', fontWeight: 'bold', fontSize: 14 },
  entregaTitulo: { color: '#111827', fontWeight: 'bold', fontSize: 13 },
  entregaSubtitulo: { color: '#6B7280', fontSize: 11, marginTop: 6 },
  seta: { color: '#9CA3AF', fontSize: 24 },
  vazio: { color: '#6B7280', fontSize: 13, marginBottom: 15 },
  erro: { color: '#DC2626', marginTop: 15 }
});
