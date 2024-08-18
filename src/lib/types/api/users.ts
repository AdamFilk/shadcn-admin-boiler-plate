import { PaginationPayload } from "./pagination";

export type GetUserListQuery = PaginationPayload & { search? :string }