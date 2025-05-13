import { useMutation } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';

type Params =
  paths['/survey/identify']['post']['requestBody']['content']['application/json'];

type Response =
  paths['/survey/identify']['post']['responses']['200']['content']['application/json'];

export function usePostSurveyIdentifyMutation() {
  return useMutation({
    mutationFn: postSurveyIdentify,
  });
}

async function postSurveyIdentify(params: Params) {
  const { data } = await http.post<Response>(END_POINT.SURVEY.IDENTIFY, params);

  return data;
}
