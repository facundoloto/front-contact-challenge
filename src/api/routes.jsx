import axios from "axios";
import Swal from "sweetalert2";

const jwt =   localStorage.getItem("jwt");
const routesApi = "https://contact-oxa5.onrender.com/v1/api";
//const routesApi = "http://localhost:8000/v1/api";

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
        localStorage.setItem("jwt", response.data.jwt);

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
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Try again!",
            });
        }
    }
};

export const getAllContactsByUser = async (id) => {
    try {
        const res = await axios.get(routesApi + '/contact/user/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        });
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


export const updateContact = async (data) => {
    const res = await api.put("/contact/update/" + data.id, data);
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