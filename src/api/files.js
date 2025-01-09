import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/files`;

export function getFile(fileName) {
  const path = `${baseUrl}/${fileName}`;

  return axios.get(path, { responseType: 'blob' }).then((response) => {
    const blob = response.data;

    return URL.createObjectURL(blob);
  });
}

export function getFiles() {
  const path = `${baseUrl}/`;

  return axios.get(path).then((response) => response.data);
}
