//centeralized API setup

import axios from 'axios';
import qs from 'qs';

const configuredBase = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');
const baseURL = configuredBase.endsWith('/api') ? configuredBase : `${configuredBase}/api`;

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})

