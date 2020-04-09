import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class ProjectEditorComponent extends Component {
  @service api

  showValidationMessages = false

  didReceiveAttrs() {
    this._super(...arguments)

    if (this.project.get('links')) {
      const links = JSON.parse(this.project.get('links'))
      Object.keys(links).map(siteName => this.project.set(siteName + 'Link', links[siteName]))
    }
  }

  @computed('project.githubLink', 'project.websiteLink')
  get links() {
    const github = this.project.githubLink
    const website = this.project.websiteLink

    const links = {
      github,
      website,
    }

    this.set('project.links', JSON.stringify(links))
    return links
  }

  @action
  deleteRecord() {
    this.get('project').destroyRecord()
      .then(r => {
        this.set('showEditModal', false)
      })
  }

  @action
  onImageUpload() {
    this.project.hasMany('screenshotUploads').reload()
  }

  @dropTask deleteScreenshotUploadTask = function* (screenshotUpload) {
    try {
      yield this.api.del(`/projects/${this.project.id}/delete-screenshot/${screenshotUpload.id}`)
      this.project.screenshotUploads.removeObject(screenshotUpload)
    } catch (err) { }
  }

  @dropTask saveRecordTask = function* (showModal) {
    if (this.project.validations.isInvalid) {
      this.set('showValidationMessages', true)
      return
    }

    yield this.get('project').save()

    this.set('showEditModal', showModal)
    this.set('newRecord', null)
  }
}
