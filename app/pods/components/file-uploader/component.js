import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import ENV from 'hiring-front/config/environment';
import { action, computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class FileUploaderComponent extends Component {
  @service fileQueue

  allowMultiple = false
  dropZoneComponent = 'file-uploader/p-drop-zone'
  dropZoneEnabled = false
  errorMessage = ''
  fileUploadComponent = 'file-uploader/p-file-upload'
  queueName = 'defaultUploadQueue'
  triggerUpload = false
  uploadEndPoint = '/minio/upload'
  uploadingText = null
  waitForTrigger = false
  maxFileSize = 5242880


  didReceiveAttrs() {
    this._super(...arguments);
    if (this.waitForTrigger && this.triggerUpload && !isEmpty(this.file)) {
      this.set('errorMessage', null)

      this.file.upload(this.uploadUrl).then(result => {
        this.onDidUpload(result.body)
      }).catch(err => {
        this.set('errorMessage', 'Error uploading files')
        this.set('currentQueue.files', A())
      })
    }
  }

  @computed('fileQueue')
  get currentQueue() {
    return this.fileQueue.find(this.queueName)
  }

  @computed('waitForTrigger', 'triggerUpload', 'currentQueue.files.length')
  get isUploading() {
    const waitForTrigger = this.waitForTrigger
    const triggerUpload = this.waitForTrigger
    const queue = this.currentQueue
    
    return !!queue.files.length && (waitForTrigger ? triggerUpload : true)
  }

  @computed('uploadEndPoint')
  get uploadUrl() {
    return ENV.API_HOST + this.uploadEndPoint
  }

  @action
  async filesDidChange(file) {
    try {
      this.set('errorMessage', null)
      this.set('fileName', file.name)

      if(file.size > this.maxFileSize) {
        this.set('errorMessage', `File size exceeds ${this.maxFileSize / 1048576} MB`)
        this.set('currentQueue.files', A())
        return
      }

      if (this.waitForTrigger) {
        this.set('triggerUpload', false)
        this.set('file', file)
      } else {
        let response = await file.upload(this.uploadUrl)
        if (this.onDidUpload) {
          this.onDidUpload(response.body)
        }
      }
    } catch(err) {
      this.set('errorMessage', 'Error uploading files')
      this.set('currentQueue.files', A())
    }
  }

  willDestroyElement() {
    this._super(...arguments)
    this.set('currentQueue.files', A())
  }
}