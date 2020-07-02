import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('companies.id')
  },

  setupController(controller, model) {
    controller.set('company', model)
  }
});
