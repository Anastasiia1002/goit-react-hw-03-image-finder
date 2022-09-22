import axios from 'axios';

export const searchImages = ({ search, page }) => {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        q: search,
        page,
        per_page: 12,
        key: '29461295-5611ba5917eca01d45986ceff',
        image_type: 'photo',
        orientation: 'horizontal',
      },
    })
    .then(({ data }) => data.hits);
};
