const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  auth: {
    login: `${API}/login`,
  },
  messagesData: {
    get: `${API}/messages`,
  },
  galleryData: {
    add: `${API}/galleryprincipal/add`,
    get: `${API}/galleryprincipal/get`,
    delete: (id) => `${API}/galleryprincipal/${id}`,
  },
};

export default endPoints;
