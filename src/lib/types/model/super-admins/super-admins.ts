import { BaseModel } from '../common/base';

export type SuperAdminModel = BaseModel & {
  username: string;
  email: string;
};
