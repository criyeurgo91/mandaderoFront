import axios from 'axios';

export async function axiosApi(endpoint, options = {}) {
    try {
        const response = await axios(endpoint, options);
        return response.data;
    } catch (error) {
        console.error('ERROR AXIOS API', error.message);
        throw error; 
    }
}

export async function axiosGet(endpoint, options = {}) {
    try {
        const response = await axios.get(endpoint, options);
        return response.data;
    } catch (error) {
        console.error('ERROR AXIOS GET', error.message);
        throw error;
    }
}

export async function axiosPost(endpoint, data) {
    try {
        const response = await axios.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('ERROR AXIOS POST', error.message);
        throw error;
    }
}

export async function axiosPut(endpoint, data) {
    try {
        const response = await axios.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('ERROR AXIOS PUT', error.message);
        throw error;
    }
}

export async function axiosPatch(endpoint, data) {
    try {
        const response = await axios.patch(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('ERROR AXIOS PATCH', error.message);
        throw error;
    }
}

export async function axiosDelete(endpoint, id) {
    try {
        const response = await axios.delete(endpoint + id);
        return response.data;
    } catch (error) {
        console.error('ERROR AXIOS DELETE', error.message);
        throw error;
    }
}
