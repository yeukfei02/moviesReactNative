import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SearchMovies from '../searchMovies/SearchMovies';
import MovieDetails from '../movieDetails/MovieDetails';

const Stack = createStackNavigator();

function MoviesView(): JSX.Element {
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
        <Stack.Screen name="Movies" component={SearchMovies} />
        <Stack.Screen name="Movie Details" component={MovieDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MoviesView;
