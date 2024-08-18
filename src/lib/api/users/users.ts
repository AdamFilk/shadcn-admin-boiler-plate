'use server'

import { ErrorResponseModel, PaginationResponseModel } from "@/lib/types/model/common/response";
import { AxiosError } from "axios";
import privateClient from "../clients/private-client";
import { endpoints } from "../endpoints";
import { GetUserListQuery } from "@/lib/types/api/users";
import { UserModel } from "@/lib/types/model/users/users";

export const getUserList = async (query: GetUserListQuery) => {
    try {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
            if (value) {
                params.append(key, String(value));
            }
        }
        const urlQueryString = new URLSearchParams(params);
        const { data } = await privateClient.get(
        endpoints.users.base + `?${urlQueryString.toString()}`,
        );
        return data as PaginationResponseModel<UserModel>;
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