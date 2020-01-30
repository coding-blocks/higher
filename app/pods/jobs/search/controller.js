import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class JobsSearchController extends Controller {
  @service session

  @computed('session') 
  get tabs() {
    let tabs = [
      {
        name: 'All Jobs',
        route: 'jobs.search.all'
      },
    ]
    
    if(this.session.isAuthenticated) {
      tabs.push({
        name: 'Applied Jobs',
        route: 'jobs.search.applied'
      })
    }

    return tabs
  }

  currentTab = this.tabs[0]
}

