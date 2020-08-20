import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import { TMDB_API_KEY } from 'react-native-dotenv';
import { getRootUrl } from '../../common/Common';

import StackViewStatusBar from '../stackViewStatusBar/StackViewStatusBar';

const ROOT_URL = getRootUrl();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  viewContainer: {
    marginHorizontal: 30,
    marginVertical: 35,
  },
  moviesDetailsCard: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  moviesDetailsImageiew: {
    alignItems: 'center',
  },
  moviesDetailsTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  moviesDetailsOverview: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 15,
  },
  moviesDetailsDescriptionView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  moviesDetailsDescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moviesDetailsDescription: {
    fontSize: 18,
  },
});

function MoviesDetails(props: any) {
  const [posterPath, setPosterPath] = useState('');
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [voteAverage, setVoteAverage] = useState('');
  const [voteCount, setVoteCount] = useState('');
  const [popularity, setPopularity] = useState('');

  useEffect(() => {
    if (props.route.params) {
      getMoviesDetails(props.route.params.movieId);
    }
  }, [props.route.params.movieId]);

  const getMoviesDetails = async (id: number) => {
    const response = await axios.get(`${ROOT_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
      },
    });
    const responseData = response.data;
    console.log('responseData = ', responseData);

    if (responseData) {
      setPosterPath(responseData.poster_path);
      setTitle(responseData.title);
      setOverview(responseData.overview);
      setReleaseDate(responseData.release_date);
      setVoteAverage(responseData.vote_average);
      setVoteCount(responseData.vote_count);
      setPopularity(responseData.popularity);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StackViewStatusBar backgroundColor="#3c5688" />
      <View style={styles.viewContainer}>
        <Card style={styles.moviesDetailsCard}>
          <View style={styles.moviesDetailsImageiew}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
              style={{ width: 200, height: 200, resizeMode: 'contain' }}
            />
          </View>
          <Text style={styles.moviesDetailsTitle}>{title}</Text>
          <Text style={styles.moviesDetailsOverview}>{overview}</Text>

          <View style={styles.moviesDetailsDescriptionView}>
            <Text style={styles.moviesDetailsDescriptionTitle}>Release Date: </Text>
            <Text style={styles.moviesDetailsDescription}>{releaseDate}</Text>
          </View>
          <View style={styles.moviesDetailsDescriptionView}>
            <Text style={styles.moviesDetailsDescriptionTitle}>Vote Average: </Text>
            <Text style={styles.moviesDetailsDescription}>{voteAverage}</Text>
          </View>
          <View style={styles.moviesDetailsDescriptionView}>
            <Text style={styles.moviesDetailsDescriptionTitle}>Vote Count: </Text>
            <Text style={styles.moviesDetailsDescription}>{voteCount}</Text>
          </View>
          <View style={styles.moviesDetailsDescriptionView}>
            <Text style={styles.moviesDetailsDescriptionTitle}>Popularity: </Text>
            <Text style={styles.moviesDetailsDescription}>{popularity}</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

export default MoviesDetails;
