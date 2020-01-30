import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.query('job', { filter: { "is_accepting =": true}})
  },

  setupController(controller, model) {
    controller.set('jobs', model)
  }
});
