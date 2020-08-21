import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, Linking } from 'react-native';

import StackViewStatusBar from '../stackViewStatusBar/StackViewStatusBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  viewContainer: {
    marginHorizontal: 30,
    marginVertical: 50,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  urlText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

function Info() {
  const handleTmdbLinkClick = () => {
    Linking.openURL(`https://developers.themoviedb.org/3/getting-started/introduction`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <StackViewStatusBar backgroundColor="#3c5688" />

      <View style={styles.viewContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../images/tmdb.png')} style={{ width: 250, height: 250, resizeMode: 'contain' }} />

          <View style={{ marginVertical: 30 }}>
            <Text style={styles.titleText}>The Movie DB</Text>
            <Text style={styles.descriptionText}>All data are from The Movie DB developer</Text>
            <TouchableOpacity onPress={() => handleTmdbLinkClick()}>
              <Text style={styles.urlText}>https://developers.themoviedb.org/3/getting-started/introduction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Info;
