import Cookies from 'universal-cookie';
const cookie = new Cookies();

const isTokenExists = () => {
    const jwt = cookie.get('jwt');
    // Replace with your actual storage key

    return !!jwt; // Return true if the token exists, otherwise false
};

export default isTokenExists;