import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Service.extend({
  session: service(),
  store: service(),
  //type ie. company or applicant

  load() {
    const currentUser = this.get('user')
    if (currentUser && currentUser.get('id')) {
      return Promise.resolve(currentUser)
    }

    return this.store.queryRecord('user', { custom: { ext: 'url', url: 'me' } })
      .then(user => {
        this.set('user', user)
        return user
      })
  },

  async getApplicantProfile() {
    if (!this.session.isAuthenticated) {
      return null
    }

    let applicantProfile = this.get('applicantProfile')
    if (!isEmpty(applicantProfile)) {
      return applicantProfile
    }

    applicantProfile = this.store.peekAll('applicant-profile').filterBy('user.id', this.user.id).firstObject

    if (!applicantProfile) {
      applicantProfile = await this.store.queryRecord("applicant-profile", {
        custom: {
          ext: 'url', url: `user/${this.user.id}`
        }
      })
    }

    this.set('applicantProfile', applicantProfile)
    return applicantProfile
  }
});
