import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findRecord('job', this.paramsFor('jobs.id').job_id)
  },

  setupController(controller, model) {
    controller.set('job', model)
  }
});
