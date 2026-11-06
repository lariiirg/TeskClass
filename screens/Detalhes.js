
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const TAREFAS = [
  {
    id: 1,
    nome: 'Pesquisa',
    responsavel: 'Ana',
    status: 'concluido',
  },
  {
    id: 2,
    nome: 'Criar slides',
    responsavel: 'Henrique',
    status: 'andamento',
  },
  {
    id: 3,
    nome: 'Preparar apresentação',
    responsavel: 'Grupo',
    status: 'pendente',
  },
];

export default function Detalhes({ route, navigation }) {
  const { width } = useWindowDimensions();
  const desktop = width >= 900;

  const {
    titulo = 'Trabalho escolar',
    tema = 'Sem tema',
    prazo = 'Não informado',
  } = route.params || {};

  const concluidas = TAREFAS.filter(
    (t) => t.status === 'concluido'
  ).length;

  const progresso = Math.round(
    (concluidas / TAREFAS.length) * 100
  );

  const integrantes = [
    ...new Set(TAREFAS.map((t) => t.responsavel)),
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.conteudo,
        desktop && styles.conteudoDesktop,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cabecalho}>
        <Pressable
          style={styles.voltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.voltarTexto}>‹</Text>
        </Pressable>

        <Text style={styles.cabecalhoTitulo}>
          DETALHES DO TRABALHO
        </Text>
      </View>

      <View style={styles.tag}>
        <Text style={styles.tagTexto}>Trabalho escolar</Text>
      </View>

      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.tema}>{tema}</Text>

      <View style={[styles.colunas, desktop && styles.colunasDesktop]}>
        <View style={styles.coluna}>
          <View style={styles.resumo}>
            <View style={styles.resumoCard}>
              <Text style={styles.resumoLabel}>◷  ENTREGA</Text>
              <Text style={styles.resumoValor}>{prazo}</Text>
              <Text style={styles.resumoDescricao}>Data de entrega</Text>
            </View>

            <View style={styles.resumoCard}>
              <Text style={styles.resumoLabel}>⚑  PROGRESSO</Text>
              <Text style={styles.resumoValor}>{progresso}%</Text>
              <Text style={styles.resumoDescricao}>
                {concluidas} de {TAREFAS.length} tarefas
              </Text>
            </View>
          </View>

          <View style={styles.integrantesCard}>
            <Text style={styles.secaoTitulo}>Integrantes</Text>
            <Text style={styles.secaoDescricao}>
              Responsáveis pelas atividades do grupo
            </Text>

            <View style={styles.integrantes}>
              {integrantes.map((nome) => (
                <View key={nome} style={styles.integrante}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarTexto}>
                      {nome.charAt(0)}
                    </Text>
                  </View>
                  <Text style={styles.integranteNome}>{nome}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.aviso}>
            <Text style={styles.avisoTitulo}>
              Acompanhamento do trabalho
            </Text>
            <Text style={styles.avisoDescricao}>
              Confira o prazo, os integrantes e o andamento
              das atividades do grupo.
            </Text>
          </View>
        </View>

        <View style={styles.coluna}>
          <View style={styles.tarefasCard}>
            <View style={styles.tarefasCabecalho}>
              <Text style={styles.secaoTitulo}>Tarefas do grupo</Text>
              <Text style={styles.progressoTexto}>
                {progresso}% concluído
              </Text>
            </View>

            <View style={styles.barraFundo}>
              <View
                style={[
                  styles.barraProgresso,
                  { width: `${progresso}%` },
                ]}
              />
            </View>

            {TAREFAS.map((tarefa) => {
              const concluida = tarefa.status === 'concluido';
              const andamento = tarefa.status === 'andamento';

              return (
                <View key={tarefa.id} style={styles.tarefa}>
                  <View
                    style={[
                      styles.check,
                      concluida && styles.checkConcluido,
                    ]}
                  >
                    <Text
                      style={[
                        styles.checkTexto,
                        concluida && styles.checkTextoConcluido,
                      ]}
                    >
                      {concluida ? '✓' : andamento ? '◷' : '○'}
                    </Text>
                  </View>

                  <View style={styles.tarefaInfo}>
                    <Text
                      style={[
                        styles.tarefaNome,
                        concluida && styles.tarefaNomeConcluido,
                      ]}
                    >
                      {tarefa.nome}
                    </Text>

                    <Text style={styles.responsavel}>
                      Responsável: {tarefa.responsavel}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.status,
                      {
                        color: concluida
                          ? '#059669'
                          : andamento
                          ? '#D97706'
                          : '#DC2626',
                      },
                    ]}
                  >
                    {concluida
                      ? 'Concluída'
                      : andamento
                      ? 'Em andamento'
                      : 'Pendente'}
                  </Text>
                </View>
              );
            })}
          </View>

          <Pressable
            style={styles.botao}
            onPress={() => navigation.navigate('Trabalhos')}
          >
            <Text style={styles.botaoTexto}>
              Voltar para trabalhos
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  conteudo: {
    width: '100%',
    padding: 20,
    paddingBottom: 45,
  },
  conteudoDesktop: {
    maxWidth: 1400,
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 15,
  },
  voltar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voltarTexto: {
    fontSize: 30,
    color: '#374151',
    marginTop: -4,
  },
  cabecalhoTitulo: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#9CA3AF',
    letterSpacing: 1.2,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagTexto: {
    color: '#B91C1C',
    fontSize: 11,
    fontWeight: 'bold',
  },
  titulo: {
    color: '#111827',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 15,
  },
  tema: {
    color: '#6B7280',
    fontSize: 15,
    marginTop: 8,
  },
  colunas: {
    gap: 18,
    marginTop: 25,
  },
  colunasDesktop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  coluna: {
    flex: 1,
    minWidth: 0,
  },
  resumo: {
    flexDirection: 'row',
    gap: 12,
  },
  resumoCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 18,
  },
  resumoLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  resumoValor: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginTop: 14,
  },
  resumoDescricao: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 5,
  },
  integrantesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 17,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  secaoDescricao: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 6,
  },
  integrantes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  integrante: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    borderRadius: 25,
    padding: 5,
    paddingRight: 13,
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: '#FEE2E2',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarTexto: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 12,
  },
  integranteNome: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  aviso: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 20,
    marginTop: 17,
  },
  avisoTitulo: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 14,
  },
  avisoDescricao: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 8,
  },
  tarefasCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  tarefasCabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  progressoTexto: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: 'bold',
  },
  barraFundo: {
    backgroundColor: '#E5E7EB',
    height: 8,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 18,
    marginBottom: 18,
  },
  barraProgresso: {
    height: '100%',
    backgroundColor: '#DC2626',
    borderRadius: 5,
  },
  tarefa: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F4',
  },
  check: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkConcluido: {
    backgroundColor: '#ECFDF5',
  },
  checkTexto: {
    color: '#9CA3AF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  checkTextoConcluido: {
    color: '#059669',
  },
  tarefaInfo: {
    flex: 1,
    minWidth: 0,
  },
  tarefaNome: {
    color: '#111827',
    fontSize: 13,
    fontWeight: 'bold',
  },
  tarefaNomeConcluido: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  responsavel: {
    color: '#6B7280',
    fontSize: 11,
    marginTop: 6,
  },
  status: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 8,
    maxWidth: 80,
    textAlign: 'right',
  },
  botao: {
    backgroundColor: '#DC2626',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 17,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
