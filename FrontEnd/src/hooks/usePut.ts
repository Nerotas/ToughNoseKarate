import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'utils/helpers/AxiosInstance';

const usePut = <Type>(url: string) => {
  const configPut = useMutation({
    mutationFn: (payload: any) => axiosInstance.put(url, payload),
  });
  const { data: responseData, mutate: responseMutate, ...others } = configPut;
  const data: Type = responseData?.data;
  const mutate: (arg0: any) => void = responseMutate;
  return { mutate, data, ...others };
};

export default usePut;
