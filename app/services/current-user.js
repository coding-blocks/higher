import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default Service.extend({
  api: service(),
  session: service(),
  store: service(),
  //type ie. company or applicant

  load() {
    const currentUser = this.get('user')

    return this.store.queryRecord('user', { custom: { ext: 'url', url: 'me' } })
      .then(user => {
        this.set('user', user)
        window.gtag('set', { userId: user.oneauthId })
        window.gtag('set', { user_id: user.oneauthId })
        window.gtag('set', { uid: user.oneauthId })
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
  },

  async getRecruiterProfile() {
    if (!this.session.isAuthenticated) {
      return null
    }

    let recruiterProfile = this.get('recruiterProfile')
    if (!isEmpty(recruiterProfile)) {
      return recruiterProfile
    }

    recruiterProfile = this.store.peekAll('recruiter-profile').filterBy('user.id', this.user.id).firstObject

    if (!recruiterProfile) {
      recruiterProfile = await this.store.queryRecord("recruiter-profile", {
        custom: {
          ext: 'url', url: `user/${this.user.id}`
        }
      })
    }

    this.set('recruiterProfile', recruiterProfile)
    return recruiterProfile
  },

  async setUserType(userType) {
    if (this.session.isAuthenticated) {
      await this.api.request("/users/set-user-type", {
        method: "POST",
        data: {
          user_type: userType
        },
      })

      await this.load()
    }
  }
});
