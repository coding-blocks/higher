import Route from '@ember/routing/route';
import moment from 'moment';

export default Route.extend({
  model() {
    return this.store.query('job', { filter: { "is_accepting =": true, "deadline >": moment().format()}})
  },

  setupController(controller, model) {
    controller.set('jobs', model)
  }
});
