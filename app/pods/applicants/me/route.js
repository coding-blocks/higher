import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'hiring-front/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),

  queryParams : {
    job_id: {
      refreshModel: false
    }
  },

  beforeModel() {
    this.transitionTo('applicants.id', this.currentUser.user.id)
  }
})
