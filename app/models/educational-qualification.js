import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    description: 'Title',
    validators: [
      validator('presence', {
        presence: true,
        message: 'College cannot be empty'
      })
    ]
  },
  subtitle: {
    description: 'Subtitle',
    validators: [
      validator('presence', {
        presence: true,
        message: 'Branch cannot be empty'
      })
    ]
  },
  startYear: {
    description: 'Start Year',
    validators: [
      validator('date'),
      validator('presence', {
        presence: true
      })
    ]
  },
  endYear: {
    description: 'End Year',
    validators: [
      validator('date'),
      validator('presence', {
        presence: true
      })
    ]
  }
})

export default DS.Model.extend(Validations, {
  title: DS.attr(),
  subtitle: DS.attr(),
  startYear: DS.attr(),
  endYear: DS.attr(),
  location: DS.attr(),
  type: DS.attr(),
  description: DS.attr(),
  isCurrent: DS.attr('boolean'),
  isOtherCollege: DS.attr(),
  isOtherCollegeSetter: Ember.computed('isOtherCollege', {
    get() {
      return this.isOtherCollege
    },
    set(key, val) {
      this.set('isOtherCollege', val)
      this.set('title', null)
      return val
    }
  }),
  applicantProfile: DS.belongsTo('applicant-profile')
});
