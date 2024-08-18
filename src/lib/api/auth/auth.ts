'use server';

import { cookies } from 'next/headers';
import publicClient from '../clients/public-client';
import { endpoints } from '../endpoints';
import { AxiosError } from 'axios';
import {
  ErrorResponseModel,
  ResponseModel,
} from '@/lib/types/model/common/response';
import { LoginPayload } from '@/lib/types/api/auth';
import { LoginResponseModel } from '@/lib/types/model/auth/auth-user';

export const login = async (payload: LoginPayload) => {
  try {
    const { data } = await publicClient.post(
      endpoints.auth.base + endpoints.auth.login,
      payload
    );
    const result = data as ResponseModel<LoginResponseModel>;
    if (result.data.tokens) {
      cookies().set('access_token', result.data.tokens.access.token);
      cookies().set('refresh_token', result.data.tokens.refresh.token);
      cookies().set('role', result.data.role);
    }

    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response) {
        const error = e.response as unknown as ErrorResponseModel;
        throw error;
      }
    }
    throw e;
  }
};

export const refreshToken = async () => {
  try {
    const { data }: { data: any } = await publicClient.get(
      endpoints.auth + endpoints.auth.refresh,
      {
        headers: {
          Authorization: `Bearer ${cookies().get('refresh_token')?.value}`,
        },
      }
    );
    cookies().set('access_token', data.data.token.access.token);
    cookies().set('refresh_token', data.data.token.refresh.token);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response) {
        const error = e.response as unknown as ErrorResponseModel;
        throw error;
      }
    }
    throw e;
  }
};

export const logout = () => {
  cookies().delete('access_token');
  cookies().delete('refresh_token');
  cookies().delete('role');
};
