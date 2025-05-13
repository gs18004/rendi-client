import { useMutation } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { http } from '~/utils/axios';
import type { paths } from '~/types/schema.d';

type Params =
  paths['/partners']['post']['requestBody']['content']['application/json'];

type Response =
  paths['/partners']['post']['responses']['201']['content']['application/json'];

export function usePostPartnersMutation() {
  return useMutation({
    mutationFn: postPartners,
  });
}

async function postPartners(params: Params) {
  const { data } = await http.post<Response>(END_POINT.PARTNERS, params);

  return data;
}
