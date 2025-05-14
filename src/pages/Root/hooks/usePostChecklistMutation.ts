import { useMutation, useQueryClient } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';
import { CHECKLIST_QUERY_KEY } from '~/constants/keys';

type Params =
  paths['/checklist']['post']['requestBody']['content']['application/json'];

type Response = paths['/checklist']['post']['responses']['204']['content'];

export function usePostChecklistMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postChecklist,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CHECKLIST_QUERY_KEY.ALL,
      });
    },
  });
}

async function postChecklist(params: Params) {
  const { data } = await http.post<Response>(END_POINT.CHECKLIST.ALL, params);

  return data;
}
