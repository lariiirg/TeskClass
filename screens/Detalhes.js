import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

export default function Detalhes({ route }) {
  const { titulo, tema, prazo } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>{titulo}</Text>

      <View style={styles.info}>
        <Text style={styles.label}>Tema</Text>
        <Text style={styles.valor}>{tema}</Text>

        <Text style={styles.label}>Prazo</Text>
        <Text style={styles.valor}>{prazo}</Text>
      </View>

      <Text style={styles.tituloTarefas}>Tarefas</Text>

      <View style={styles.tarefa}>
        <Text style={styles.nomeTarefa}>Pesquisa</Text>
        <Text style={styles.responsavel}>Responsável: Ana</Text>
        <Text style={styles.concluida}>Concluída</Text>
      </View>

      <View style={styles.tarefa}>
        <Text style={styles.nomeTarefa}>Criar slides</Text>
        <Text style={styles.responsavel}>Responsável: Henrique</Text>
        <Text style={styles.andamento}>Em andamento</Text>
      </View>

      <View style={styles.tarefa}>
        <Text style={styles.nomeTarefa}>Preparar apresentação</Text>
        <Text style={styles.responsavel}>Responsável: Grupo</Text>
        <Text style={styles.pendente}>Pendente</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FF',
  },

  conteudo: {
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 20,
  },

  info: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 5,
  },

  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
  },

  tituloTarefas: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 30,
    marginBottom: 15,
  },

  tarefa: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },

  nomeTarefa: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  responsavel: {
    color: '#64748B',
    marginTop: 5,
  },

  concluida: {
    color: '#16A34A',
    fontWeight: 'bold',
    marginTop: 10,
  },

  andamento: {
    color: '#D97706',
    fontWeight: 'bold',
    marginTop: 10,
  },

  pendente: {
    color: '#DC2626',
    fontWeight: 'bold',
    marginTop: 10,
  },
});