import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

import StackViewStatusBar from '../stackViewStatusBar/StackViewStatusBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  viewContainer: {
    marginHorizontal: 30,
    marginVertical: 35,
  },
});

function Info() {
  return (
    <ScrollView style={styles.container}>
      <StackViewStatusBar backgroundColor="#3232ff" />
      <View style={styles.viewContainer}>
        <Text>Info</Text>
      </View>
    </ScrollView>
  );
}

export default Info;
