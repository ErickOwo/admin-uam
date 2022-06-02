
const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  auth:{
    login: `${API}/login`,
  }
}

export default endPoints;