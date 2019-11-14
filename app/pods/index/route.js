import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const yoy = this.store.findAll('company-lead')
    return this.store.createRecord('company-lead')
  },

  setupController(controller, model) {
    controller.set('lead', model)
  }
});
