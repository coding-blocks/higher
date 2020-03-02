import Controller from '@ember/controller';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class JobSearchAllController extends Controller {
  @service store 

  limit = 10
  offset = 0

  @restartableTask fetchJobsTask = function* () {
    return yield this.store.query('job', {
      filter: {
        "is_accepting =": true, 
        "deadline >": moment().format(),
        "companies.is_active =": true
      },
      page: {
        limit: this.limit,
        offset: this.offset
      }
    })
  }

  @restartableTask fetchPastJobsTask = function *() {
    return yield this.store.query('job', {
      filter: {
        "deadline <": moment().format()
      },
      page: {
        limit: 5,
        offset: 0
      }
    })
  }
}
