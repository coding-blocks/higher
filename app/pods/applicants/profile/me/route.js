import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AuthenticatedRouteMixin from 'hiring-front/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  session: service(),
  webengage: service(),
  sidenav: service(),

  queryParams: {
    job_id: {
      refreshModel: false
    }
  },

  activate() {
    webengage.trackEvent("Hire: Applicant Profile", {})
  },

  async beforeModel() {
    this.sidenav.set('for', 'applicant')
    await this.currentUser.setUserType('applicant')

    if (this.session.isAuthenticated) {
      return this.transitionTo('applicants.profile.id', this.currentUser.user.id)
    }

    window.localStorage.setItem('redirection_path', '/applicants/profile/me')
    this._super(...arguments)
  }
})
