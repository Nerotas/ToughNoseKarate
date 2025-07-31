import { useQueryClient } from '@tanstack/react-query';

export const useMutationData = <Type>(apiLabel: string[], id = '0'): Type => {
  const queryClient = useQueryClient();
  const response = queryClient.getQueryData([apiLabel, id]);
  return response as Type;
};
