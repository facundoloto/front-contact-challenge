import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const jwt = cookies.get('jwt');
const routesApi = "http://localhost:8000/v1/api";

const api = axios.create({
    baseURL: routesApi,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
    }
});

export const registerBySystem = async (data) => {
    try {

        const response = await axios.post(routesApi + '/auth/register/', data);

        if (response.status === 201) {
            Swal.fire({
                icon: "success",
                title: "success",
                showConfirmButton: false,
                timer: 1500,
            });

        }

    } catch (error) {
        // Handle Axios error
        if (error.response || error.response.status === 403) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email used,Try again!",
            });
        }
    }
};

export const loginBySystem = async (data) => {

    try {
        const dataLogin = { email: data.email, password: data.password };
        const response = await axios.post(routesApi + '/auth/login/', dataLogin);
        cookies.set("jwt", response.data.jwt);

        // Handle successful response
        if (response.status == 202) {
            Swal.fire({
                icon: "success",
                title: "success",
                showConfirmButton: false,
                timer: 1500,
            });

            return response.data;
        }

    } catch (error) {
        // Handle Axios error
        if (error.response || error.response.status === 401) {
            console.error('Unauthorized: Please check your credentials.');

        }
    }
};

export const getAllContactsByUser = async (id) => {
    try {
        const res = await api.get(routesApi + '/contact/user/' + id);
        return res.data;
    }
    catch (error) {
        // Handle Axios error
        if (error.response || error.response.status === 401) {
            console.error('Unauthorized: Please check your credentials.');

        }
    }
};

export const createContact = async (data) => {

    const response = await api.post('/contact/', data);
    console.log(response)
    if (!response.status === 200) {
        throw new Error('error send post');
    }
    else {

        Swal.fire({
            icon: "success",
            title: "success",
            showConfirmButton: false,
            timer: 1500,
        });
        return response;
    }

};

export const deleteContact = async (id) => {

    const res = await api.delete("/contact/delete/" + id);
    if (res.status === 200) {
        Swal.fire({
            icon: "success",
            title: "success",
            showConfirmButton: false,
            timer: 1500,
        });
        return res;
    }
};


export default api;