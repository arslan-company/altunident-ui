import axios from 'axios';

const baseUrl = `${process.env.API_URL}/blog`;

export const getBlogs = (searchText, size = 6, page = 1) => {
  const path = `${baseUrl}/`;

  const params = {
    title: searchText,
    size,
    page,
    sort_by: 'date',
    sort_order: 'desc',
  };

  return axios.get(path, { params }).then((response) => response.data);
};

export const getBlog = (blogId) => {
  const path = `${baseUrl}/${blogId}`;

  return axios.get(path).then((response) => response.data);
};
