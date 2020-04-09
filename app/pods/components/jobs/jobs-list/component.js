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

  filter = {
    "is_accepting =": true,
    "deadline >": moment().format(),
    "companies.is_active =": true
  }

  didReceiveAttrs() {
    this._super(...arguments)
    this.fetchJobsTask.perform(this.filter)
  }

  @restartableTask fetchJobsTask = function* (filter) {
    return yield this.store.query('job', {
      filter,
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
