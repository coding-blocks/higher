import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class JobSearchAppliedController extends Controller {
  @service store

  limit = 10
  offset = 0

  @restartableTask fetchJobsTask = function* () {
    return yield this.store.query('job', {
      custom: {
        ext: 'url',
        url: '0/applied'
      },
      page: {
        limit: this.limit,
        offset: this.offset
      },
      sort: "-job_applications.created_at"
    })
  }
}
