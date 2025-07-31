import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import axiosInstance from 'helpers/AxiosInstance';

const getFetch = async (
  url: string,
  apiLabel: string,
  id?: string | number,
  headers?: AxiosRequestHeaders
): Promise<any> => {
  //adding anayltics to all fetches to cover all cases. Maybe be reduced later.
  // try catch block is not needed when used in useQuery, to show errors it needs a rejected promise
  const { data } = await axiosInstance.get(url, { headers });
  return data;
};

interface TUseGet<Type> {
  apiLabel: string;
  headers?: AxiosRequestHeaders;
  id?: string | number;
  options?: UseQueryOptions<Type, AxiosError, any, QueryKey>;
  url: string;
}

const useGet = <ResponseDataType>({
  apiLabel,
  headers,
  id = '0',
  options,
  url,
}: TUseGet<ResponseDataType>) =>
  useQuery<ResponseDataType, AxiosError>({
    queryKey: [apiLabel, id],
    queryFn: () => getFetch(url, apiLabel, id, headers),
    ...options,
  });

export default useGet;
/*
Example use


    const { refetch: getCharacters, data: characters } = useGet<Characters[]>({
        apiLabel: 'characters',
        url: baseURL,
        options: {
            enabled: true,
        },
    });

    getCharacters will fetch the data
    characters will be the state returned by ReactQuery

    options must be passed in as json

*/
