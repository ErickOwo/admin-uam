import axios from 'axios';
import endPoints from './';

const getData = async (url) => {
  const response = await axios(url);
  return response.data;
};

const getDataGallery = async (url) => {
  const response = await axios(url);
  return response.data;
};

const postDataImg = async (url, body) => {
  const response = await axios.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(endPoints.galleryData.delete(id));
  return response.data;
};

export { getData, postDataImg, getDataGallery, deleteImg };
