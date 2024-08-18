import { BaseModel } from '../common/base';

export type AdminModel = BaseModel & {
  username: string;
  email: string;
  imageUrl?: string | null;
};
