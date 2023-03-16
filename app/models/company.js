import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: {
    description: 'Name',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  description: {
    description: 'Company Description',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  website: {
    description: 'Website',
    validators: [
      validator('format', {
        type: 'url'
      })
    ]
  }
})


export default DS.Model.extend(Validations, {
  name: DS.attr(),
  website: DS.attr(),
  logo: DS.attr(),
  contacts: DS.attr(),
  contactsJSON: Ember.computed('contacts', function () {
    return JSON.parse(this.contacts)
  }),
  description: DS.attr(),
  isActive: DS.attr(),
  isReviewed: DS.attr(),
  jobs: DS.hasMany('job'),
  logoUpload: DS.belongsTo('upload', { inverse: 'logoUpload' }),
  videoUpload: DS.belongsTo('upload', { inverse: 'videoUpload' }),
  brochureUpload: DS.belongsTo('upload', { inverse: 'brochureUpload' }),
  recruiterProfile: DS.belongsTo('recruiter-profile')
});
