import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import axiosInstance from 'helpers/AxiosInstance';

// Fetch function that works both client and server side
const getFetch = async (url: string, headers?: AxiosRequestHeaders): Promise<any> => {
  const { data } = await axiosInstance.get(url, { headers });
  return data;
};

// Server-side fetch function for pre-fetching
export const serverFetch = async (url: string, headers?: Record<string, string>): Promise<any> => {
  const { data } = await axiosInstance.get(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    // Add timeout for server-side requests
    timeout: 10000, // 10 seconds
  });

  return data;
};

interface TUseGet<Type> {
  apiLabel: string;
  headers?: AxiosRequestHeaders;
  id?: string | number;
  options?: Omit<UseQueryOptions<Type, AxiosError, Type, QueryKey>, 'queryKey' | 'queryFn'>;
  url: string;
  // New option for SSR compatibility
  fallbackData?: Type;
}

const useGet = <ResponseDataType>({
  apiLabel,
  headers,
  id = '0',
  options,
  url,
  fallbackData,
}: TUseGet<ResponseDataType>) => {
  const queryOptions: UseQueryOptions<ResponseDataType, AxiosError, ResponseDataType, QueryKey> = {
    queryKey: [apiLabel, id],
    queryFn: () => getFetch(url, headers),
    // Default options optimized for SSR
    staleTime: 60 * 1000, // 60 seconds
    retry: 2,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    ...options,
  };

  // Add placeholder data conditionally to avoid type issues
  if (fallbackData) {
    queryOptions.placeholderData = fallbackData as any;
  }

  return useQuery<ResponseDataType, AxiosError>(queryOptions);
};

export default useGet;
