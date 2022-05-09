import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, FlatList, TouchableOpacity, Image, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { TMDB_API_KEY } from 'react-native-dotenv';
import { getRootUrl } from '../../helper/helper';

import SnackBar from '../snackBar/SnackBar';
import ImageSlider from '../imageSlider/ImageSlider';
import Divider from '../divider/Divider';
import StackViewStatusBar from '../stackViewStatusBar/StackViewStatusBar';
import CustomDialog from '../customDialog/CustomDialog';

const rootUrl = getRootUrl();

interface MoviesListData {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

let allMoviesListData: MoviesListData[] = [];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  viewContainer: {
    marginHorizontal: 30,
    marginVertical: 25,
  },
  searchTextTextInput: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
  },
  sortByRatingsButtonContainer: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#b5c8ea',
    borderRadius: 5,
  },
  sortByRatingsButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  clearButtonContainer: {
    marginVertical: 8,
    padding: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  moviesItemCard: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginVertical: 10,
  },
  moviesItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerStyle: {
    marginVertical: 5,
  },
  noDataContainer: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#f9ec14',
    borderRadius: 5,
  },
  noDataText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  noNetworkContainer: {
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  noNetworkText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
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
            <Text style={styles.moviesItemTitle}>
              {props.item.title.length < 25 ? props.item.title : `${props.item.title.substring(0, 25)}...`}
            </Text>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              {renderRatingStar(props.item.vote_average)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

function SearchMovies(): JSX.Element {
  const [hasNetwork, setHasNetwork] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const [moviesListData, setMoviesListData] = useState<MoviesListData[]>([]);
  const [page, setPage] = useState(1);

  const [dialogStatus, setDialogStatus] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');

  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarType, setSnackBarType] = useState('');
  const [snackBarMessage, setSnackBarMessage] = useState('');

  console.log('page = ', page);
  console.log('totalPages = ', totalPages);

  useEffect(() => {
    checkNetworkStatus();
    getAsyncStorageData();
    showCustomDialog();
  }, []);

  useEffect(() => {
    if (hasNetwork) {
      if (searchText && searchText.length > 3) {
        getMoviesListData(searchText, page);
      }
    }
  }, [hasNetwork, searchText]);

  useEffect(() => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);

      for (let i = page; i < totalPages; i++) {
        getMoviesListData(searchText, page);
      }
    } else if (page === totalPages) {
      if (allMoviesListData) {
        const currentDate = moment().endOf('year').format('YYYY-MM-DD');
        const lastYearDate = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD');

        const filteredResults = allMoviesListData.filter((item: MoviesListData, i: number) => {
          const releaseDate = moment(item.release_date);
          if (releaseDate.isBetween(lastYearDate, currentDate)) {
            return item;
          }
        });
        // console.log('filteredResults = ', filteredResults);

        setMoviesListData(filteredResults);
      }
    }
  }, [page, totalPages]);

  const checkNetworkStatus = async () => {
    const networkStatus = await Network.getNetworkStateAsync();
    if (networkStatus.isConnected && networkStatus.isInternetReachable) {
      setHasNetwork(true);
    }
  };

  const getAsyncStorageData = async () => {
    try {
      const searchTextFromAsyncStorage = await AsyncStorage.getItem('@searchText');
      if (searchTextFromAsyncStorage) {
        setSearchText(searchTextFromAsyncStorage);
      }
    } catch (e) {
      console.log('error = ', e.message);
    }
  };

  const storeAsyncStorageData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('error = ', e.message);
    }
  };

  const showCustomDialog = () => {
    setDialogStatus(true);
    setDialogTitle('Find your Movies');
    setDialogDescription('Enter text in input field to find your movies');
  };

  const getMoviesListData = async (searchText: string, page: number) => {
    const response = await axios.get(`${rootUrl}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        query: searchText,
        page: page,
      },
    });
    const responseData = response.data;
    // console.log('responseData = ', responseData);

    if (responseData) {
      allMoviesListData = allMoviesListData.concat(responseData.results);
      allMoviesListData = _.uniqBy(allMoviesListData, 'title');

      if (page === 1) {
        if (responseData.total_pages < 50) {
          setTotalPages(responseData.total_pages);
        }
      }
    }
  };

  const handleSearchTextChange = (searchText: string) => {
    storeAsyncStorageData('@searchText', searchText);
    setSearchText(searchText);

    allMoviesListData = [];
    setTotalPages(0);
    setMoviesListData([]);
    setPage(1);
  };

  const renderMoviesItem = (props: any) => {
    return <MoviesItem item={props.item} />;
  };

  const renderResultDiv = (hasNetwork: boolean, moviesListData: MoviesListData[]) => {
    let resultDiv = (
      <View style={styles.noNetworkContainer}>
        <Text style={styles.noNetworkText}>There are no network</Text>
      </View>
    );

    if (hasNetwork && moviesListData) {
      resultDiv = (
        <View>
          {renderSortByRatingsButton(moviesListData)}
          {renderClearButton(moviesListData)}
          {renderMoviesList(moviesListData)}
        </View>
      );
    }

    return resultDiv;
  };

  const renderSortByRatingsButton = (moviesListData: MoviesListData[]) => {
    let sortByRatingsButton = null;

    if (!_.isEmpty(moviesListData)) {
      sortByRatingsButton = (
        <TouchableOpacity onPress={() => handleSortByRatings()}>
          <View style={styles.sortByRatingsButtonContainer}>
            <Text style={styles.sortByRatingsButtonText}>Sort by ratings</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return sortByRatingsButton;
  };

  const renderClearButton = (moviesListData: MoviesListData[]) => {
    let clearButton = null;

    if (!_.isEmpty(moviesListData)) {
      clearButton = (
        <TouchableOpacity onPress={() => handleClear()}>
          <View style={styles.clearButtonContainer}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return clearButton;
  };

  const renderMoviesList = (moviesListData: MoviesListData[]) => {
    let moviesList = (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>There are no data</Text>
      </View>
    );

    if (!_.isEmpty(moviesListData)) {
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

  const handleSortByRatings = () => {
    if (!_.isEmpty(moviesListData)) {
      const sortedMoviesListData = _.orderBy(moviesListData, ['vote_average'], ['desc']);
      setMoviesListData(sortedMoviesListData);
    }
  };

  const handleClear = () => {
    setSearchText('');

    allMoviesListData = [];
    setTotalPages(0);
    setMoviesListData([]);
    setPage(1);
  };

  const handleHideDialog = () => {
    if (dialogStatus) {
      setDialogStatus(false);
    }
  };

  const handleSnackBarDismiss = () => {
    if (snackBarStatus) {
      setSnackBarStatus(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <StackViewStatusBar backgroundColor="#3c5688" />

      <ImageSlider />

      <View style={styles.viewContainer}>
        <TextInput
          style={styles.searchTextTextInput}
          placeholder="Enter some text..."
          placeholderTextColor="black"
          value={searchText}
          onChangeText={(text: string) => handleSearchTextChange(text)}
        />

        <Divider style={styles.dividerStyle} />

        {renderResultDiv(hasNetwork, moviesListData)}
      </View>

      <CustomDialog
        dislogStatus={dialogStatus}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}
        hideDialog={() => handleHideDialog()}
      />

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
