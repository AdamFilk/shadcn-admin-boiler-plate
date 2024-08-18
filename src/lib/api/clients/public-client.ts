'use server';

import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const publicClient = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default publicClient;
