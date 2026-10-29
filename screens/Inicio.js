import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
} from 'react-native';

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.logoArea}>
        <Text style={styles.logo}>TaskClass</Text>

        <Text style={styles.slogan}>
          Organize seus trabalhos. Divida tarefas. Cumpra seus prazos.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>
          Seus trabalhos em um só lugar
        </Text>

        <Text style={styles.descricao}>
          Organize trabalhos escolares, acompanhe tarefas e veja o andamento
          das atividades do seu grupo.
        </Text>

        <Pressable
          style={styles.botao}
          onPress={() => navigation.navigate('Trabalhos')}
        >
          <Text style={styles.textoBotao}>
            Ver trabalhos
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FF',
    justifyContent: 'center',
    padding: 25,
  },

  logoArea: {
    marginBottom: 40,
  },

  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#4F46E5',
    textAlign: 'center',
  },

  slogan: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 23,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 20,
    elevation: 4,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 15,
  },

  descricao: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
    marginBottom: 25,
  },

  botao: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});