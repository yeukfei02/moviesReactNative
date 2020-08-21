import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
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
  searchTextTextInput: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
  },
  moviesItemCard: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 15,
  },
  moviesItemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  dividerStyle: {
    marginVertical: 5,
  },
});

function MoviesItem(props: any) {
  const navigation = useNavigation();

  const handleMovieItemsClick = () => {
    navigation.navigate('Movie Details', {
      movieId: props.item.id,
    });
  };

  const renderRatingStar = (voteAverage: number) => {
    const ratingStar = [];

    for (let i = 0; i < voteAverage / 2; i++) {
      ratingStar.push(<FontAwesome key={i} name="star" size={18} color="#e5e500" style={{ marginHorizontal: 1 }} />);
    }

    if (ratingStar.length < 5) {
      ratingStar.push(<FontAwesome name="star-o" size={18} color="black" style={{ marginHorizontal: 1 }} />);
    }

    return ratingStar;
  };

  return (
    <Card style={styles.moviesItemCard}>
      <TouchableOpacity onPress={() => handleMovieItemsClick()}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${props.item.poster_path}` }}
            style={{ width: 80, height: 120, resizeMode: 'stretch' }}
          />
          <View style={{ flexDirection: 'column', justifyContent: 'center', marginHorizontal: 10 }}>
            <Text style={styles.moviesItemTitle}>{props.item.title}</Text>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              {renderRatingStar(props.item.vote_average)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

function SearchMovies(props: any) {
  const [searchText, setSearchText] = useState('');
  const [moviesListData, setMoviesListData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  useEffect(() => {
    if (searchText) {
      getMoviesListData(searchText);
    } else {
      setMoviesListData([]);

      // setSnackBarStatus(true);
      // setSnackBarType('error');
      // setSnackBarMessage('Enter search text more than 3 characters.');
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
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <StackViewStatusBar backgroundColor="#3c5688" />
      <View style={styles.viewContainer}>
        <TextInput
          style={styles.searchTextTextInput}
          placeholder="Enter some text..."
          placeholderTextColor="black"
          value={searchText}
          onChangeText={(text: string) => handleSearchTextChange(text)}
        />

        <Divider style={styles.dividerStyle} />

        {renderMoviesList(moviesListData)}
      </View>

      <SnackBar
        snackBarStatus={snackBarStatus}
        snackBarType={snackBarType}
        handleSnackBarDismiss={() => handleSnackBarDismiss()}
        snackBarMessage={snackBarMessage}
      />
    </ScrollView>
  );
}

export default SearchMovies;
