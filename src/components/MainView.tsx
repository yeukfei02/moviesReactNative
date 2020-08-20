import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function MainView() {
  return (
    <View style={styles.container}>
      <Text>MainView</Text>
    </View>
  );
}

export default MainView;
