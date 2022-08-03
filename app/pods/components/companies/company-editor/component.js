import Component from '@ember/component';
import { dropTask } from 'ember-concurrency-decorators';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class CompanyEditorComponent extends Component {
  @service toast
  @service store
  @service currentUser

  triggerUpload = false
  showViewUploadModal = false

  @dropTask saveCompanyTask = function* () {
    try {
      if (this.company.validations.isInvalid) {
        this.toast.error(this.company.validations.message)
        return
      }

      const logoUpload = yield this.company.get('logoUpload')
      if (logoUpload && logoUpload.hasDirtyAttributes) {
        yield logoUpload.save()
      }

      const videoUpload = yield this.company.get('videoUpload')
      if (videoUpload && videoUpload.hasDirtyAttributes) {
        yield videoUpload.save()
      }

      const brochureUpload = yield this.company.get('brochureUpload')
      if (brochureUpload && brochureUpload.hasDirtyAttributes) {
        yield brochureUpload.save()
      }

      this.company.set('contacts', JSON.stringify(this.company.contactsJSON))
      yield this.company.save()
      this.toast.success('Company Profile saved successfully')
    } catch (err) {
      console.log(err)
      this.toast.error('Error Saving Company')
    }
  }

  @action
  async onImageUpload({ url }) {
    this.company.set('logo', url)

    let logoUpload = await this.company.get('logoUpload')

    if (isEmpty(logoUpload)) {
      logoUpload = this.store.createRecord('upload', {
        type: 'company_logo',
        isVerified: true,
        verifiedById: this.currentUser.user.id,
        url
      })

      this.company.set('logoUpload', logoUpload)
    }
    else {
      logoUpload.set('url', url)
      await logoUpload.save()
    }
  }

  @action
  async onBrochureUpload({ url }) {
    let brochureUpload = await this.company.get('brochureUpload')

    if (isEmpty(brochureUpload)) {
      brochureUpload = this.store.createRecord('upload', {
        type: 'company_brochure',
        isVerified: true,
        verifiedById: this.currentUser.user.id,
        url: url
      })

      this.company.set('brochureUpload', brochureUpload)
    }
    else {
      brochureUpload.set('url', url)
      await brochureUpload.save()
    }
  }

  @action
  async onVideoUpload({ url }) {
    let videoUpload = await this.company.get('videoUpload')

    if (isEmpty(videoUpload)) {
      videoUpload = this.store.createRecord('upload', {
        type: 'company_video',
        isVerified: true,
        verifiedById: this.currentUser.user.id,
        url: url
      })

      this.company.set('videoUpload', videoUpload)
    }
    else {
      videoUpload.set('url', url)
      await videoUpload.save()
    }

    // this.set('videoUpload', videoUpload)
  }

  @action
  toggleShowViewUploadModal(uploadType) {
    this.set('selectedViewUpload', uploadType)
    this.set('showViewUploadModal', true)
  }
}
