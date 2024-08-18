export type LoginPayload =
  | {
      username: string;
      password: string;
    }
  | {
      email: string;
      password: string;
    };
