import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('company', {
      isActive: true,
      contacts: JSON.stringify([])
    })
  },

  setupController(controller, model) {
    controller.set('company', model)
  }
});
