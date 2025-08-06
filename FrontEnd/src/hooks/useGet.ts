import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import axios from 'axios';
import axiosInstance from 'utils/helpers/AxiosInstance';
import { getConfig } from '../utils/config/frontend.config';

// Fetch function that works both client and server side
const getFetch = async (url: string, headers?: AxiosRequestHeaders): Promise<any> => {
  const { data } = await axiosInstance.get(url, { headers });
  return data;
};

// Server-side fetch function for pre-fetching public endpoints only
// This should only be used for endpoints that don't require authentication (like belt-requirements)
export const serverFetch = async (url: string, headers?: Record<string, string>): Promise<any> => {
  // Get config for server-side
  const config = getConfig();

  // Create a server-safe axios instance that doesn't access localStorage
  const serverAxiosInstance = axios.create({
    baseURL: config.NEXT_PUBLIC_API_PATH,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  // Add API version to URL if not present
  let finalUrl = url;
  if (!url.includes('/v')) {
    finalUrl = `/${config.NEXT_PUBLIC_API_VERSION}${url}`;
  }

  const { data } = await serverAxiosInstance.get(finalUrl);
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
