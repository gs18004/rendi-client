import { queryOptions } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { PROFILE_QUERY_KEY } from '~/constants/keys';
import type { paths } from '~/types/schema.d';
import { http } from '~/utils/axios';

type Response =
  paths['/users/me/profile']['get']['responses']['200']['content']['application/json'];

async function getProfile() {
  const { data } = await http.get<Response>(END_POINT.PROFILE);

  return data;
}

export function profileOptions() {
  return queryOptions({
    queryKey: PROFILE_QUERY_KEY.ALL,
    queryFn: () => getProfile(),
  });
}
