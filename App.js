
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './screens/Inicio';
import Trabalhos from './screens/Trabalhos';
import Detalhes from './screens/Detalhes';
import Perfil from './screens/Perfil';

const Stack = createNativeStackNavigator();

const abas = [
  { nome: 'Inicio', icone: '⌂', titulo: 'Início' },
  { nome: 'Trabalhos', icone: '▤', titulo: 'Trabalhos' },
  { nome: 'Perfil', icone: '◉', titulo: 'Perfil' },
];

function Menu({ navigation, atual, desktop }) {
  return (
    <View style={desktop ? styles.menuDesktop : styles.menuMobile}>
      {desktop && (
        <View style={styles.marca}>
          <View style={styles.marcaIcone}>
            <Text style={styles.marcaSimbolo}>✓</Text>
          </View>
          <Text style={styles.marcaNome}>Deadline</Text>
        </View>
      )}

      {abas.map((aba) => {
        const ativo = atual === aba.nome;

        return (
          <Pressable
            key={aba.nome}
            onPress={() => navigation.navigate(aba.nome)}
            style={[
              styles.aba,
              desktop ? styles.abaDesktop : styles.abaMobile,
              ativo && desktop && styles.abaAtiva,
            ]}
          >
            <Text style={[styles.icone, ativo && styles.ativo]}>
              {aba.icone}
            </Text>
            <Text style={[styles.abaTexto, ativo && styles.ativo]}>
              {aba.titulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Layout({ navigation, atual, children }) {
  const { width } = useWindowDimensions();
  const desktop = width >= 900;

  return (
    <View style={styles.layout}>
      {desktop && (
        <Menu navigation={navigation} atual={atual} desktop />
      )}

      <View style={styles.areaPrincipal}>
        <View style={styles.conteudo}>{children}</View>

        {!desktop && (
          <Menu navigation={navigation} atual={atual} desktop={false} />
        )}
      </View>
    </View>
  );
}

function TelaInicio(props) {
  return (
    <Layout navigation={props.navigation} atual="Inicio">
      <Inicio {...props} />
    </Layout>
  );
}

function TelaTrabalhos(props) {
  return (
    <Layout navigation={props.navigation} atual="Trabalhos">
      <Trabalhos {...props} />
    </Layout>
  );
}

function TelaPerfil(props) {
  return (
    <Layout navigation={props.navigation} atual="Perfil">
      <Perfil {...props} />
    </Layout>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F7F8FA' },
        }}
      >
        <Stack.Screen name="Inicio" component={TelaInicio} />
        <Stack.Screen name="Trabalhos" component={TelaTrabalhos} />
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name="Perfil" component={TelaPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F7F8FA',
  },
  areaPrincipal: {
    flex: 1,
    minWidth: 0,
  },
  conteudo: {
    flex: 1,
  },
  menuDesktop: {
    width: 240,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 42,
    paddingHorizontal: 10,
  },
  marcaIcone: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  marcaSimbolo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  marcaNome: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#111827',
  },
  menuMobile: {
    height: 76,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  aba: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  abaDesktop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 15,
    borderRadius: 13,
    marginBottom: 7,
  },
  abaMobile: {
    flex: 1,
  },
  abaAtiva: {
    backgroundColor: '#FEF2F2',
  },
  icone: {
    fontSize: 23,
    color: '#9CA3AF',
    marginRight: 7,
  },
  abaTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  ativo: {
    color: '#DC2626',
  },
});
