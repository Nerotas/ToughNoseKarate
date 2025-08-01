import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from 'utils/helpers/AxiosInstance';

const fetchData = async (url: string, apiLabel: string[], id = '0', payload: any): Promise<any> => {
  //adding anayltics to all fetches to cover all cases. Maybe be reduced later.
  try {
    const response = await axiosInstance.post(url, payload);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

const usePost = <ResponseDataType>(url: string, apiLabel: string[], id = '0') => {
  const queryClient = useQueryClient();
  const configPost = useMutation<ResponseDataType>({
    mutationFn: (payload) => fetchData(url, apiLabel, id, payload),
    mutationKey: apiLabel,
    onSuccess: (data) => {
      queryClient.setQueryData([apiLabel, id], data);
    },
    onError: () => {
      queryClient.setQueryData([apiLabel, id], null);
    },
  });
  const { data: responseData, mutate: responseMutate, ...others } = configPost;
  const mutate: (arg0: any) => void = responseMutate;
  return { mutate, responseData, ...others };
};
export default usePost;
