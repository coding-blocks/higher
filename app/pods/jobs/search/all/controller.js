import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class JobSearchAllController extends Controller {
  @service store 

  limit = 10
  offset = 0

  jobsFilter = {
    "is_accepting =": true,
    "deadline >": moment().format(),
    "companies.is_active =": true
  }

  pastJobsFilter = {
    "deadline <": moment().format()
  }

  @restartableTask fetchJobsTask = function* (filter) {
    return yield this.store.query('job', {
      filter,
      page: {
        limit: this.limit,
        offset: this.offset
      },
      sort:"-posted_on"
    })
  }

  @restartableTask fetchPastJobsTask = function *(filter) {
    return yield this.store.query('job', {
      filter,
      page: {
        limit: 5,
        offset: 0
      },
      sort: "-posted_on"
    })
  }

  @action 
  onApplyFilter() {
    this.fetchJobsTask.perform(this.jobsFilter)
  }
}
