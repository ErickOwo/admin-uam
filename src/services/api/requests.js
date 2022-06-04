import axios from "axios";

const getData = async url =>{
  const response = await axios(url);
  return response.data;
}

const getDataGallery = async url =>{
  const response = await axios(url);
  return response.data;
}

const postDataImg = async (url, body) =>{
  const response = await axios.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data;
}

export {
  getData,
  postDataImg,
  getDataGallery,
}