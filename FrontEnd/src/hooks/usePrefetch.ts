import axiosInstance from 'helpers/AxiosInstance';
import { useQueryClient } from '@tanstack/react-query';

interface IPrefetch {
  apiLabel: string;
  id?: string;
  url: string;
}

const usePrefetch = async <Type>({ apiLabel, id = '0', url }: IPrefetch) => {
  const queryClient = useQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [apiLabel, id],
    queryFn: async () => {
      const response = await axiosInstance.get(url);
      const data = response.data;
      return data as Type;
    },
  });
};

export default usePrefetch;
