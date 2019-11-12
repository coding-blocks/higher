import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('lead')
  },

  setupController(controller, model) {
    controller.set('lead', model)
  }
});
