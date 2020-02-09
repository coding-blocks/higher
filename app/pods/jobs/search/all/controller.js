import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class JobSearchAllController extends Controller {
  @service store 

  limit = 4
  offset = 0

  @restartableTask fetchJobsTask = function* () {
    return yield this.store.query('job', {
      filter: {
        "is_accepting =": true, "deadline >": moment().format()
      },
      page: {
        limit: this.limit,
        offset: this.offset
      }
    })
  }
}
