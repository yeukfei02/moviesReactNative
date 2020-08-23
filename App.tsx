import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import MainView from './src/components/mainView/MainView';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3c5688',
    accent: '#b5c8ea',
  },
};

function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <MainView />
    </PaperProvider>
  );
}

export default App;
