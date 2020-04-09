import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    description: 'Title',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  subtitle: {
    description: 'Subtitle',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  startDate: {
    description: 'Start Date',
    validators: [
      validator('date'),
      validator('presence', {
        presence: true
      })
    ]
  },
  endDate: {
    description: 'End Date',
    validators: [
      validator('date', {
        after: Ember.computed('model.startDate', function () {
          return this.get('model.startDate')
        }),
        message: 'End Date must be after Start Date'
      }),
      validator('presence', {
        presence: Ember.computed('model.isCurrent', function() {
          return !this.get('model.isCurrent')
        })
      })
    ]
  },
  githubLink: {
    description: 'Link',
    validators: [
      validator('format', {
        type: 'url',
        allowBlank: true,
      })
    ]
  },
  websiteLink: {
    description: 'Link',
    validators: [
      validator('format', {
        type: 'url',
        allowBlank: true,
      })
    ]
  },
})

export default DS.Model.extend(Validations, {
  title: DS.attr(),
  subtitle: DS.attr(),
  startDate: DS.attr(),
  endDate: DS.attr(),
  githubLink: DS.attr(),
  websiteLink: DS.attr(),
  links: DS.attr(),
  startDateString: Ember.computed('startDate', {
    get() {
      return moment.unix(this.get('startDate')).toDate()
    },
    set(key, val) {
      this.set('startDate', moment(val).unix())
      return moment(val).toDate()
    }
  }),
  endDateString: Ember.computed('endDate','isCurrent', {
    get() {
      return moment.unix(this.get('endDate')).toDate()
    },
    set(key, val) {
      if(this.get('isCurrent')){
        this.set('endDate', null)
      } else {
        this.set('endDate', moment(val).unix())
      }
      return moment(val).toDate()
    }
  }),
  isCurrent: DS.attr('boolean'),
  isCurrentSetter: Ember.computed('isCurrent', {
    get() {
      return this.isCurrent
    },
    set(key, val) {
      if (val) {
        this.set('endDate', null)
      }
      this.set('isCurrent', val)
      return val
    }
  }),
  location:DS.attr(),
  type:DS.attr(),
  description:DS.attr(),
  applicantProfile: DS.belongsTo('applicant-profile'),
  screenshotUploadIds:DS.attr(),
  screenshotUploads: DS.hasMany('upload')
});
