import { queryOptions } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { SCHEDULES_QUERY_KEY } from '~/constants/keys';
import type { paths } from '~/types/schema.d';
import { http } from '~/utils/axios';

type Response =
  paths['/schedules']['get']['responses']['200']['content']['application/json'];

async function getSchedules() {
  const { data } = await http.get<Response>(END_POINT.SCHEDULES);

  return data;
}

export function schedulesOptions() {
  return queryOptions({
    queryKey: SCHEDULES_QUERY_KEY.ALL,
    queryFn: () => getSchedules(),
  });
}
