const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  auth: {
    login: `${API}/login`,
    signUp: `${API}/signup`,
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
  basesData: {
    api: `${API}/bases`,
  },
  multimediaData: {
    api: `${API}/multimedia`,
  },
  cooperationData: {
    api: `${API}/cooperation`,
  },
};

export default endPoints;
