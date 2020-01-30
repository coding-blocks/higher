import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'hiring-front/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.query('job', {
      custom: {
        ext: 'url',
        url: '0/applied'
      }
    })
  },

  setupController(controller, model) {
    controller.set('jobs', model)
  }
});
