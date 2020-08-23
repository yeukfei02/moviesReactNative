import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Info from '../info/Info';

const Stack = createStackNavigator();

function InfoView(): JSX.Element {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#b5c8ea',
          },
          headerTitleStyle: {
            color: 'black',
          },
        }}
      >
        <Stack.Screen name="Info" component={Info} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default InfoView;
