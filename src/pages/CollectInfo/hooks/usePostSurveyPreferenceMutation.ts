import { useMutation } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';

type Params =
  paths['/survey/preference']['post']['requestBody']['content']['application/json'];

type Response =
  paths['/survey/preference']['post']['responses']['200']['content']['application/json'];

export function usePostSurveyPreferenceMutation() {
  return useMutation({
    mutationFn: postSurveyPreference,
  });
}

async function postSurveyPreference(params: Params) {
  const { data } = await http.post<Response>(
    END_POINT.SURVEY.PREFERENCE,
    params,
  );

  return data;
}
