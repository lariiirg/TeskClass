import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>

      <View style={styles.avatar}>
        <Text style={styles.letra}>A</Text>
      </View>

      <Text style={styles.nome}>Aluno TaskClass</Text>
      <Text style={styles.email}>aluno@taskclass.com</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Tipo de usuário</Text>
        <Text style={styles.valor}>Membro</Text>

        <View style={styles.linha} />

        <Text style={styles.label}>Trabalhos ativos</Text>
        <Text style={styles.valor}>2 trabalhos</Text>
      </View>

      <Text style={styles.aviso}>
        As informações de usuário serão integradas ao cadastro e login
        nas próximas etapas do projeto.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FF',
    alignItems: 'center',
    padding: 25,
    paddingTop: 50,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  letra: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },

  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 18,
  },

  email: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 5,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginTop: 30,
    elevation: 3,
  },

  label: {
    color: '#64748B',
    fontSize: 14,
  },

  valor: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },

  linha: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 18,
  },

  aviso: {
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 25,
  },
});