import { useMutation } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';

type Params =
  paths['/survey/essay']['post']['requestBody']['content']['application/json'];

type Response =
  paths['/survey/essay']['post']['responses']['201']['content']['application/json'];

export function usePostSurveyEssayMutation() {
  return useMutation({
    mutationFn: postSurveyEssay,
  });
}

async function postSurveyEssay(params: Params) {
  const { data } = await http.post<Response>(END_POINT.SURVEY.ESSAY, params);

  return data;
}
