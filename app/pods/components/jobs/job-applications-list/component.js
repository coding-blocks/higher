import Component from '@ember/component';
import { action } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class JobApplicationsListComponent extends Component {
  @service store

  @alias('fetchJobApplicationsTask.lastSuccessful.value') jobApplications
  @alias('fetchJobApplicationsTask.lastSuccessful.value.meta') pagination

  limit = 10
  offset = 0

  didReceiveAttrs() {
    this._super(...arguments)
    this.fetchJobApplicationsTask.perform()
  }

  @restartableTask fetchJobApplicationsTask = function* () {
    return yield this.store.query('job-application', {
      custom: {
        ext: 'url',
        url: `job/${this.jobId}`
      },
      page: {
        limit: this.limit,
        offset: this.offset
      }
    })
  }

  @action
  paginate() {
    this.fetchJobApplicationsTask.perform()
  }
}
