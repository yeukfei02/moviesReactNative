import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import MoviesView from '../moviesView/MoviesView';
import InfoView from '../infoView/InfoView';

const Tab = createBottomTabNavigator();

function MainView() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon = null;

            switch (route.name) {
              case 'Movies':
                icon = focused ? (
                  <MaterialCommunityIcons name="movie" size={size} color={color} />
                ) : (
                  <MaterialCommunityIcons name="movie" size={size} color={color} />
                );
                break;
              case 'Info':
                icon = focused ? (
                  <Feather name="info" size={size} color={color} />
                ) : (
                  <Feather name="info" size={size} color={color} />
                );
                break;
            }

            return icon;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#3232ff',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Movies" component={MoviesView} />
        <Tab.Screen name="InfoView" component={InfoView} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainView;
