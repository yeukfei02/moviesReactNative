import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import StackViewStatusBar from '../stackViewStatusBar/StackViewStatusBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  viewContainer: {
    marginHorizontal: 30,
    marginVertical: 35,
  },
});

function Info() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <StackViewStatusBar backgroundColor="#3c5688" />
      <View style={styles.viewContainer}>
        <Text>Info</Text>
      </View>
    </ScrollView>
  );
}

export default Info;
