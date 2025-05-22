module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['*'],  // Allow all origins during testing
      headers: ['*'],  // Allow all headers
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      keepHeaderOnError: true,
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  'strapi::security',
]; 