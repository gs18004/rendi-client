import { queryOptions } from '@tanstack/react-query';
import { END_POINT } from '~/constants/api';
import { CHECKLIST_QUERY_KEY } from '~/constants/keys';
import type { paths } from '~/types/schema.d';
import { http } from '~/utils/axios';

type Response =
  paths['/checklist/items']['get']['responses']['200']['content']['application/json'];

async function getChecklistItems() {
  const { data } = await http.get<Response>(END_POINT.CHECKLIST);

  return data;
}

export function checklistItemsOptions() {
  return queryOptions({
    queryKey: CHECKLIST_QUERY_KEY.ITEMS(),
    queryFn: () => getChecklistItems(),
  });
}
