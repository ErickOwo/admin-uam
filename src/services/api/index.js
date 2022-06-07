const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  auth: {
    login: `${API}/login`,
  },
  messagesData: {
    get: `${API}/messages`,
  },
  galleryData: {
    api: `${API}/galleryprincipal`,
  },
  equipoData: {
    api: `${API}/equipotecnico`,
  },
  multimediaData: {
    api: `${API}/multimedia`,
  },
};

export default endPoints;
