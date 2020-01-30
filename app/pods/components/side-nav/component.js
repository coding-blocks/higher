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
        name: 'Jobs',
        iconClass: 'fas fa-briefcase fa-2x',
        route: 'jobs'
      }
    ]
  }
}
