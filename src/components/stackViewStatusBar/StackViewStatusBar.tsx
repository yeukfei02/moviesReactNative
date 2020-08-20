import React from 'react';
import { StatusBar, Platform } from 'react-native';

function StackViewStatusBar(props: any) {
  return (
    <StatusBar
      backgroundColor={props.backgroundColor}
      barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
    />
  );
}

export default StackViewStatusBar;
