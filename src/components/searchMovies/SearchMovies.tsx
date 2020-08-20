import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TMDB_API_KEY } from 'react-native-dotenv';
import { getRootUrl } from '../../common/Common';

import SnackBar from '../snackBar/SnackBar';
import Divider from '../divider/Divider';
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
  moviesItemCard: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 15,
  },
  moviesItemImageiew: {
    alignItems: 'center',
  },
  moviesItemTitle: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  dividerStyle: {
    marginVertical: 5,
  },
});

function MoviesItem(props: any) {
  const navigation = useNavigation();

  const handleMovieItemsClick = () => {
    navigation.navigate('Movies Details', {
      movieId: props.item.id,
    });
  };

  return (
    <Card style={styles.moviesItemCard}>
      <TouchableOpacity onPress={() => handleMovieItemsClick()}>
        <View style={styles.moviesItemImageiew}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}` }}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.moviesItemTitle}>{props.item.title}</Text>
    </Card>
  );
}

function SearchMovies(props: any) {
  const [searchText, setSearchText] = useState('');
  const [moviesListData, setMoviesListData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    if (searchText) {
      getMoviesListData(searchText);
    } else {
      setMoviesListData([]);
    }
  }, [searchText]);

  const getMoviesListData = async (searchText: string) => {
    const response = await axios.get(`${ROOT_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: page,
      },
    });
    const responseData = response.data;
    console.log('responseData = ', responseData);

    if (responseData.results) {
      const filteredResults = responseData.results.filter((item: any, i: number) => {
        if (item.title.includes(searchText)) {
          return item;
        }
      });
      setMoviesListData(filteredResults);
    }
  };

  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
  };

  const renderMoviesItem = (props: any) => {
    return <MoviesItem item={props.item} />;
  };

  const renderMoviesList = (moviesListData: any[]) => {
    let moviesList = null;

    if (moviesListData) {
      moviesList = (
        <FlatList
          data={moviesListData}
          renderItem={renderMoviesItem}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }

    return moviesList;
  };

  const handleSnackBarDismiss = () => {
    if (snackBarStatus) {
      setSnackBarStatus(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StackViewStatusBar backgroundColor="#3c5688" />
      <View style={styles.viewContainer}>
        <TextInput
          label="Enter some text..."
          value={searchText}
          onChangeText={(text: string) => handleSearchTextChange(text)}
        />

        <Divider style={styles.dividerStyle} />

        {renderMoviesList(moviesListData)}
      </View>
      <SnackBar
        snackBarStatus={snackBarStatus}
        handleSnackBarDismiss={() => handleSnackBarDismiss()}
        snackBarMessage={snackBarMessage}
      />
    </ScrollView>
  );
}

export default SearchMovies;
