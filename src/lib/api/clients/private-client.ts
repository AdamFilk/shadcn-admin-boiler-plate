'use server';

import axios from 'axios';
import { cookies } from 'next/headers';
import { refreshToken } from '../auth/auth';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;

const privateClient = axios.create({
  baseURL: backendUrl,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptors
privateClient.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem('access_token');
    const token = cookies().get('access_token')?.value;
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

privateClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    /**
     * * If the error status is 401 and there is no originalRequest.sent flag,
     * * it means the token has expired and we need to refresh it
     */
    if (error.response.status === 401 && !originalRequest.sent) {
      originalRequest.sent = true;
      /**
       * * Retry the original request with the new token
       */
      try {
        const result = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${result?.data.token.access}`;
        return axios(originalRequest);
      } catch (e) {
        /**
         * * Remove tokens
         */
        cookies().delete('access_token');
        cookies().delete('refresh_token');
        window.location.href = `${window.location.origin}/login`;
        await new Promise((resolve: any) => setTimeout(resolve, 2000));
      }
    }
    return Promise.reject(error);
  }
);

export default privateClient;
