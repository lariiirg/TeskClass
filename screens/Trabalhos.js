import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';

export default function Trabalhos({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>Meus Trabalhos</Text>

      <Text style={styles.subtitulo}>
        Acompanhe seus trabalhos e atividades.
      </Text>

      <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate('Detalhes', {
            titulo: 'Trabalho de Biologia',
            tema: 'Biotecnologia',
            prazo: '10/11/2026',
          })
        }
      >
        <Text style={styles.materia}>Biologia</Text>
        <Text style={styles.nomeTrabalho}>Biotecnologia</Text>
        <Text style={styles.prazo}>Prazo: 10/11/2026</Text>
        <Text style={styles.detalhes}>Ver detalhes →</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate('Detalhes', {
            titulo: 'Trabalho de História',
            tema: 'Guerra Fria',
            prazo: '18/11/2026',
          })
        }
      >
        <Text style={styles.materia}>História</Text>
        <Text style={styles.nomeTrabalho}>Guerra Fria</Text>
        <Text style={styles.prazo}>Prazo: 18/11/2026</Text>
        <Text style={styles.detalhes}>Ver detalhes →</Text>
      </Pressable>

      <Pressable
        style={styles.botaoPerfil}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.textoBotao}>
          Meu perfil
        </Text>
      </Pressable>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  subtitulo: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    elevation: 3,
  },

  materia: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: 'bold',
  },

  nomeTrabalho: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 5,
  },

  prazo: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 8,
  },

  detalhes: {
    color: '#4F46E5',
    fontWeight: 'bold',
    marginTop: 15,
  },

  botaoPerfil: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});