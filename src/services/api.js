import axios from 'axios';

const API_KEY = '31968153-ea36afa9c46b62a3fbea8fe58';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: API_KEY,
    per_page: 12,
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
