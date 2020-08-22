import React, { useState, useEffect } from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import axios from 'axios';
import { TMDB_API_KEY } from 'react-native-dotenv';
import { getRootUrl } from '../../common/Common';

const ROOT_URL = getRootUrl();

function ImageSlider() {
  const [imagesList, setImagesList] = useState<string[]>([]);

  useEffect(() => {
    getImagesList();
  }, []);

  const getImagesList = async () => {
    const response = await axios.get(`${ROOT_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });
    const responseData = response.data;
    console.log('responseData = ', responseData);

    if (responseData.results) {
      const imagesList = responseData.results.map((item: any, i: number) => {
        return `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
      });
      const filteredImagesList = imagesList.filter((item: any, i: number) => {
        return i < 5;
      });
      setImagesList(filteredImagesList);
    }
  };

  return <SliderBox images={imagesList} sliderBoxHeight={250} dotColor="red" />;
}

export default ImageSlider;
