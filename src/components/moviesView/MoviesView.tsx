import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchMovies from '../searchMovies/SearchMovies';
import MoviesDetails from '../moviesDetails/MoviesDetails';

const Stack = createStackNavigator();

function MoviesView() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Movies" component={SearchMovies} />
        <Stack.Screen name="Movies Details" component={MoviesDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MoviesView;
