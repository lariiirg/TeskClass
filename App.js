import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './screens/Inicio';
import Trabalhos from './screens/Trabalhos';
import Detalhes from './screens/Detalhes';
import Perfil from './screens/Perfil';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4F46E5',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ title: 'TaskClass' }}
        />

        <Stack.Screen
          name="Trabalhos"
          component={Trabalhos}
          options={{ title: 'Meus Trabalhos' }}
        />

        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={{ title: 'Detalhes' }}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ title: 'Meu Perfil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}