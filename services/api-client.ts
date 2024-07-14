import ky from 'ky';

export const apiClient = ky.extend({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        return request;
      },
    ],
  },
});
