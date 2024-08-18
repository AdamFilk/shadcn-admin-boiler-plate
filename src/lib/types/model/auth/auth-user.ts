import { Role } from '@/lib/enums/role.enum';
import { SuperAdminModel } from '../super-admins/super-admins';
import { AdminModel } from '../admins/admins';
import { AgentModel } from '../agents/agents';

export type TokensModel = {
  access: {
    token: string;
    expireAt: Date;
  };
  refresh: {
    token: string;
    expireAt: Date;
  };
};

export type AuthUser = (SuperAdminModel | AdminModel | AgentModel) & {
  role: Role;
};

export type LoginResponseModel = AuthUser & { tokens: TokensModel };
