import { BaseModel } from '../common/base';

export type AgentModel = BaseModel & {
  ref: string;
  username: string;
  email: string;
  phone: string;
  imageUrl?: string | null;
  active: boolean;
};
