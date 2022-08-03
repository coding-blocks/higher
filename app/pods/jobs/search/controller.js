import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class JobsSearchController extends Controller {
  @service session
  @service currentUser

  @computed('session.isAuthenticated')
  get tabs() {
    let tabs = []

    if (this.currentUser.get('user.userType') === 'applicant') {
      tabs.push({
        name: 'All Jobs',
        route: 'jobs.search.all'
      })

      if (this.session.isAuthenticated) {
        tabs.push({
          name: 'Applied Jobs',
          route: 'jobs.search.applied'
        })
      }
    } else {
      tabs = []
    }

    return tabs
  }

  currentTab = this.tabs[0]
}

