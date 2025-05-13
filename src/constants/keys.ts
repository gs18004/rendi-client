export const PROFILE_QUERY_KEY = {
  ALL: ['profile'],
};
export const DASHBOARD_QUERY_KEY = {
  ALL: ['dashboard'],
};
export const SCHEDULES_QUERY_KEY = {
  ALL: ['schedules'],
};
export const CHECKLIST_QUERY_KEY = {
  ALL: ['checklist'],
  ITEMS: () => [...CHECKLIST_QUERY_KEY.ALL, 'items'],
};
