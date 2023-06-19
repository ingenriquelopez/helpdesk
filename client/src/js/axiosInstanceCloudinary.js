import axios from 'axios';
const { 
        REACT_APP_CLOUDINARY_CLOUD_NAME, 
        REACT_APP_CLOUDINARY_HELPDESK,
        REACT_APP_CLOUDINARY_API_KEY,
        REACT_APP_CLOUDINARY_API_SECRET,
  } = process.env;


  const BASE_URL = `${REACT_APP_CLOUDINARY_HELPDESK}/${REACT_APP_CLOUDINARY_CLOUD_NAME}`;

const axiosInstanceCloudinary = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: REACT_APP_CLOUDINARY_API_KEY,
    password: REACT_APP_CLOUDINARY_API_SECRET,
  },
});

export default axiosInstanceCloudinary;