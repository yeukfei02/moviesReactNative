export const getRootUrl = (): string => {
  let rootUrl = '';

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    rootUrl = 'https://api.themoviedb.org/3';
  } else {
    rootUrl = 'https://api.themoviedb.org/3';
  }

  return rootUrl;
};
