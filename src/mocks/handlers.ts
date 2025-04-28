import { delay, http, HttpResponse } from 'msw';
import { BASE_URL } from '~/constants/api';

export const handlers = [
  http.get(`${BASE_URL}/hello-world/`, async () => {
    await delay(300);
    return HttpResponse.json(
      {
        message: 'Hello, world!',
      },
      {
        status: 200,
      },
    );
  }),
];
