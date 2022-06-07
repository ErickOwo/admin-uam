const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  auth: {
    login: `${API}/login`,
  },
  messagesData: {
    get: `${API}/messages`,
  },
  galleryData: {
    add: `${API}/galleryprincipal`,
    get: `${API}/galleryprincipal`,
    delete: (id) => `${API}/galleryprincipal/${id}`,
  },
  equipoData: {
    add: `${API}/equipotecnico`,
    get: `${API}/equipotecnico`,
    delete: (id) => `${API}/equipotecnico/${id}`,
  },
  multimediaData: {
    add: `${API}/multimedia`,
    get: `${API}/multimedia`,
    delete: (id) => `${API}/multimedia/${id}`,
  },
};

export default endPoints;
