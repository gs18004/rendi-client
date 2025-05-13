import { useMutation, useQueryClient } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';
import { SCHEDULES_QUERY_KEY } from '~/constants/keys';

type Params =
  paths['/schedules']['post']['requestBody']['content']['application/json'];

type Response =
  paths['/schedules']['post']['responses']['200']['content']['application/json'];

export function usePostScheduleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SCHEDULES_QUERY_KEY.ALL,
      });
    },
  });
}

async function postSchedule(params: Params) {
  const { data } = await http.post<Response>(END_POINT.SCHEDULES, params);

  return data;
}
