import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SideNavComponent extends Component {
  @service sidenav

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
    ]
  }
}
