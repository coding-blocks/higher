import FileField from 'ember-uploader/components/file-field';
import Uploader from 'ember-uploader/uploaders/uploader';
import { action } from '@ember/object';
import ENV from 'hiring-front/config/environment';

export default FileField.extend({
  filesDidChange(files) {
    const uploader = Uploader.create({
      url: ENV.ApiHost + this.get('UploadEndPoint')
    });

    if (!Ember.isEmpty(files)) {
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(files[0], { whateverObject });
    }

    uploader.on('progress', e => {
      this.onProgress(e)
    })

    uploader.on('didUpload', e => {
      this.onDidUpload(e)
    })

    uploader.on('didError', e => {
      this.onDidError(e)
    })

    this.set('uploader', uploader)
  },

  
});