import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, Linking } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

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

  const handleEmailClick = () => {
    Linking.openURL(`mailto:yeukfei02@gmail.com`);
  };

  const handleGithubClick = () => {
    Linking.openURL(`https://github.com/yeukfei02`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <StackViewStatusBar backgroundColor="#3c5688" />

      <View style={styles.viewContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../images/tmdb.png')} style={{ width: 250, height: 250, resizeMode: 'contain' }} />

          <View style={{ marginTop: 30 }}>
            <Text style={styles.titleText}>The Movie DB</Text>
            <Text style={styles.descriptionText}>All data are from The Movie DB developer</Text>
            <TouchableOpacity onPress={() => handleTmdbLinkClick()}>
              <Text style={styles.urlText}>https://developers.themoviedb.org/3/getting-started/introduction</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={styles.descriptionText}>Developer: Donald Wu</Text>
            <View style={{ alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => handleEmailClick()}>
                  <MaterialIcons name="email" size={50} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => handleGithubClick()}>
                  <FontAwesome name="github" size={50} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Info;
