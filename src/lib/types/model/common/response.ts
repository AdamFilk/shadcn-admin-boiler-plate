export type ResponseModel<T> = {
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
  data: T;
};

export type PaginationResponseModel<T> = {
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
  data: T[];
  meta?: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links?: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
};

export type ErrorResponseModel = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string[] | string;
  messageIsArray: boolean;
};
