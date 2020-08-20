import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import MainView from './src/components/mainView/MainView';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3232ff',
    accent: '#ADD8E6',
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <MainView />
    </PaperProvider>
  );
}

export default App;