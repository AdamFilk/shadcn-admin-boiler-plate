import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { GetUserListQuery } from "../types/api/users"
import { getUserList } from "../api/users/users"

export const useGetUsersQuery = (query: GetUserListQuery) => {
    return useQuery({
        queryKey: ['users', query.page],
        queryFn: () => getUserList(query),
        placeholderData: keepPreviousData,
        refetchInterval: 0
    })
}