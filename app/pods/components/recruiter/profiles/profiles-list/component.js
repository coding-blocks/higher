import Component from '@ember/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { alias } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';

export default class ProfilesList extends Component {
  @service toast;
  @service store;

  @alias('fetchProfilesTask.lastSuccessful.value') profiles
  @alias('fetchProfilesTask.lastSuccessful.value.meta') pagination

  limit = 10
  offset = 0

  filter = {}
  filters = [
    {
      name: 'users.firstname',
      type: 'like',
      operator: 'like'
    }
  ]
  filterValue = null

  didReceiveAttrs() {
    this._super(...arguments)
    this.fetchProfilesTask.perform()
  }

  @restartableTask fetchProfilesTask = function* () {
    const filter = this.filter
    return yield this.store.query('applicant-profile', {
      filter,
      page: {
        limit: this.limit,
        offset: this.offset
      },
      sort: "-updated_at"
    })
  }

  @action
  verifyProfile(profile) {
    profile.set('isReviewed', true)
    profile.save().then(r => {
      this.toast.success("Profile marked as Reviewed successfully")
    }).catch(err => {
      this.toast.error("An error occured performing that action.")
    })
  }

  @action
  unverifyProfile(profile) {
    profile.set('isReviewed', false)
    profile.save().then(r => {
      this.toast.success("Profile marked as Not Reviewed successfully")
    }).catch(err => {
      this.toast.error("An error occured performing that action.")
    })
  }

  @action
  paginate() {
    this.fetchProfilesTask.perform()
  }

  @action
  print(valuee, value) {
    console.log('action value', value)
  }
}
