import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SideNavComponent extends Component {
  @service sidenav
  @service router

  for = 'applicant'

  @computed('router.currentURL')
  get isRecruiterRouteActive() {
    let currentURL = this.router.currentURL.split('/')[1]
    return currentURL === 'recruiter'
  }

  @computed('sidenav.for') 
  get navContents() {
    return this.navTypes[this.sidenav.for]
  }

  navTypes = {
    applicant: [
      {
        name: 'Profile',
        iconClass: 'fas fa-id-card font-xl',
        route: 'applicants.profile'
      },
      {
        name: 'Jobs',
        iconClass: 'fas fa-briefcase font-xl',
        route: 'jobs'
      }
    ],
    recruiter: [
      {
        name: 'My Jobs',
        iconClass: 'fas fa-briefcase font-xl',
        route: 'jobs'
      },
      // {
      //   name: 'Search',
      //   iconClass: 'fas fa-users font-xl',
      //   route: 'applicants.profile'
      // },
      {
        name: 'My Companies',
        iconClass: 'fas fa-building font-xl',
        route: 'companies'
      },
    ]
  }
}
