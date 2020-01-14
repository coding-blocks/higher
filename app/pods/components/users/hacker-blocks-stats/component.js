import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { dropTask } from 'ember-concurrency-decorators';

export default class HackerBlocksStatsComponent extends Component {
  @service api
  @service router

  @alias('fetchHackerBlocksStatsTask.lastSuccessful.value') stats

  async didReceiveAttrs() {
    this._super(...arguments)
    this.fetchHackerBlocksStatsTask.perform()
  }

  @dropTask fetchHackerBlocksStatsTask = function* () {
    const route = this.router.currentRoute
    return yield this.api.request(`/applicant-profiles/user/${route.params.user_id}/hacker-blocks-performance`)
  }

}
