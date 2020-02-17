import Component from '@ember/component';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class JobsListComponent extends Component {
  @service store

  @alias('fetchJobsTask.lastSuccessful.value') jobs
  @alias('fetchJobsTask.lastSuccessful.value.meta') pagination

  allowPagination = true
  limit = 4
  offset = 0

  didReceiveAttrs() {
    this._super(...arguments)
    this.fetchJobsTask.perform()
  }

  @restartableTask fetchJobsTask = function* () {
    return yield this.store.query('job', {
      filter: {
        "is_accepting =": true, 
        "deadline >": moment().format(),
        "company_profiles.is_active =": true
      },
      page: {
        limit: this.limit,
        offset: this.offset
      }
    })
  }

  @action
  paginate() {
    this.fetchJobsTask.perform()
  }
}
