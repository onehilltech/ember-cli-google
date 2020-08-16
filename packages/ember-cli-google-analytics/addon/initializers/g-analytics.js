export function initialize (app) {
  app.inject ('route', 'analytics', 'service:g-analytics');
}

export default {
  initialize
};
