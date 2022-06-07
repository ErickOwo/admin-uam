import axios from 'axios';

const getData = async (url) => {
  const response = await axios(url);
  return response.data;
};

const postData = async (url, body) => {
  const response = await axios.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const putData = async (url, body) => {
  const response = await axios.put(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deleteData = async (url, id) => {
  const response = await axios.delete(`${url}/${id}`);
  return response.data;
};

export { getData, postData, putData, deleteData };
