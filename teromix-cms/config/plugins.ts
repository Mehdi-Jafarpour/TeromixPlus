export default {
  'strapi-plugin-cors': {
    enabled: true,
    config: {
      origin: ['https://teromix.com', 'http://localhost:3000'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      keepHeaderOnError: true,
    },
  },
};
