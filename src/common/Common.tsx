export const getRootUrl = () => {
  let ROOT_URL = '';

  if (process.env.NODE_ENV === 'development') {
    ROOT_URL = 'https://api.themoviedb.org/3';
  } else {
    ROOT_URL = 'https://api.themoviedb.org/3';
  }

  return ROOT_URL;
};
