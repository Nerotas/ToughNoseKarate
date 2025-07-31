import axiosInstance from 'helpers/AxiosInstance';
import { useMutation } from '@tanstack/react-query';

const useDelete = (url: string, data?: any) => {
  const configDelete = useMutation({
    mutationFn: () => axiosInstance.delete(url, data),
  });
  return configDelete;
};

export default useDelete;

/*
Example use

    const deleteBlog = useDelete(`posts/1`);
    deleteBlog.mutate();

    delete cannot be used as a variable name

*/
