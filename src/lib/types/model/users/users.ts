import { BaseModel } from '../common/base';

export type UserModel = BaseModel & {
  name: string;
  email: string;
  phone: string;
};
