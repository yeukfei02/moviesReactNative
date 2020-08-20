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
  movieDetailsCard: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  movieDetailsImageiew: {
    alignItems: 'center',
  },
  movieDetailsTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  movieDetailsOverview: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 15,
  },
  movieDetailsDescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDetailsDescription: {
    fontSize: 18,
  },
});

function MovieDetails(props: any) {
  const [posterPath, setPosterPath] = useState('');
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [voteAverage, setVoteAverage] = useState('');
  const [voteCount, setVoteCount] = useState('');
  const [popularity, setPopularity] = useState('');

  useEffect(() => {
    if (props.route.params) {
      getMovieDetails(props.route.params.movieId);
    }
  }, [props.route.params.movieId]);

  const getMovieDetails = async (id: number) => {
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
        <Card style={styles.movieDetailsCard}>
          <View style={styles.movieDetailsImageiew}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
              style={{ width: 300, height: 300, resizeMode: 'contain' }}
            />
          </View>
          <Text style={styles.movieDetailsTitle}>{title}</Text>
          <Text style={styles.movieDetailsOverview}>{overview}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.movieDetailsDescriptionTitle}>Release Date: </Text>
              <Text style={styles.movieDetailsDescriptionTitle}>Vote Average: </Text>
              <Text style={styles.movieDetailsDescriptionTitle}>Vote Count: </Text>
              <Text style={styles.movieDetailsDescriptionTitle}>Popularity: </Text>
            </View>
            <View style={{ flexDirection: 'column', marginLeft: 5 }}>
              <Text style={styles.movieDetailsDescription}>{releaseDate}</Text>
              <Text style={styles.movieDetailsDescription}>{voteAverage}</Text>
              <Text style={styles.movieDetailsDescription}>{voteCount}</Text>
              <Text style={styles.movieDetailsDescription}>{popularity}</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

export default MovieDetails;
