import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Incidents from '../screens/Incidents';
import Datail from '../screens/Datail';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Incidents">
        <Stack.Screen name="Incidents" component={Incidents} />
        <Stack.Screen name="Datail" component={Datail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
