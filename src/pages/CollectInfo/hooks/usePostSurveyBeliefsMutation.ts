import { useMutation } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';

type Params =
  paths['/survey/beliefs']['post']['requestBody']['content']['application/json'];

type Response =
  paths['/survey/beliefs']['post']['responses']['200']['content']['application/json'];

export function usePostSurveyBeliefsMutation() {
  return useMutation({
    mutationFn: postSurveyBeliefs,
  });
}

async function postSurveyBeliefs(params: Params) {
  const { data } = await http.post<Response>(END_POINT.SURVEY.BELIEFS, params);

  return data;
}
