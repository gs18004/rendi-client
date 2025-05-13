import { useMutation } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';

type Params =
  paths['/survey/lifestyle']['post']['requestBody']['content']['application/json'];

type Response =
  paths['/survey/lifestyle']['post']['responses']['200']['content']['application/json'];

export function usePostSurveyLifestyleMutation() {
  return useMutation({
    mutationFn: postSurveyLifestyle,
  });
}

async function postSurveyLifestyle(params: Params) {
  const { data } = await http.post<Response>(
    END_POINT.SURVEY.LIFESTYLE,
    params,
  );

  return data;
}
