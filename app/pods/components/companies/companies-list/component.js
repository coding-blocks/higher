import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { action, computed } from '@ember/object';
import { restartableTask } from 'ember-concurrency-decorators';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default class CompanysIndexController extends Component {
  @service store

  @alias('fetchCompanysTask.lastSuccessful.value') companies
  @alias('fetchCompanysTask.lastSuccessful.value.meta') pagination

  limit = 10
  offset = 0
  companyProfileSearchFilter = ''
  companySearchFilter = ''
  filter = {}

  didReceiveAttrs() {
    this._super(...arguments)
    this.fetchCompanysTask.perform()
  }

  getFilter() {
    let filter = this.filter
    const companyProfileSearchFilter = this.companyProfileSearchFilter

    if (!isEmpty(companyProfileSearchFilter)) {
      filter["name like"] = `%${companyProfileSearchFilter}%`
    } else {
      delete filter["name like"]
    }

    this.set('offset', 0)
    return filter
  }

  @restartableTask fetchCompanysTask = function* () {
    const filter = this.getFilter()
    return yield this.store.query('company', {
      filter,
      page: {
        limit: this.limit,
        offset: this.offset
      },
      sort: "-created_at"
    })
  }

  @action
  paginate() {
    this.fetchCompanysTask.perform()
  }
}
