import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL,
    timeout: 60000,
});

export const setJwtToken = (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const setInterceptor = () => {
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        (err: any) => {
            const error = err.response;
            let errorMsg;
            if (error && error.status === 401) {
                errorMsg = `Your previous login session has expired. Please login again to use the platform.`;
            }
            if (error && error.status === 403) {
                errorMsg = error.status;
            }
            if (error && error.status === 500) {
                errorMsg = error.data.message
            }
            return Promise.reject(errorMsg || `Sorry, some system issue. Please try again and if issue still persists, please report to our team at publir`);
        },
    );
};

export default axiosInstance;
