import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'hiring-front/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  session: service(),

  queryParams: {
    job_id: {
      refreshModel: false
    }
  },

  beforeModel() {
    if (this.session.isAuthenticated) {
      this.transitionTo('applicants.profile.id', this.currentUser.user.id)
    }
    window.localStorage.setItem('redirection_path', '/applicants/profile/me')
    this._super(...arguments)
  }
})
