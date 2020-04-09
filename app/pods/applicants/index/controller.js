import Controller from '@ember/controller';
import { dropTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service  } from '@ember/service';

export default class ApplicantIndexController extends Controller {
  @service store

  @alias ('fetchTopTwoJobsTask.lastSuccessful.value') jobs

  constructor() {
    super(...arguments)
    this.fetchTopTwoJobsTask.perform()
  }

  @dropTask fetchTopTwoJobsTask = function *() {
    return yield this.store.query('job', {
      filter: {
        "is_accepting =": true, "deadline >": moment().format()
      },
      page: {
        limit: 2,
        offset: 0
      }
    })
  }
}
