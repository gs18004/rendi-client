import { useMutation, useQueryClient } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { PROFILE_QUERY_KEY } from '~/constants/keys';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';

type Params =
  paths['/users/me/profile']['post']['requestBody']['content']['application/json'];

type Response =
  paths['/users/me/profile']['post']['responses']['201']['content']['application/json'];

export function usePostProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY.ALL,
      });
    },
  });
}

async function postProfile(params: Params) {
  const { data } = await http.put<Response>(END_POINT.PROFILE, params);

  return data;
}
