import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth/auth';

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  });
};
