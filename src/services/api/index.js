const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  auth: {
    login: `${API}/login`,
    profile: `${API}/user`,
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
