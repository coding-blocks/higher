import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  organizationType: {
    description: 'Organization Type',
    validators: [
      validator('presence', {
        presence: true,
        message: 'Select an Organization'
      })
    ]
  },
  organizationName: {
    description: 'Organization Name',
    validators: [
      validator('presence', {
        presence: true
      })
    ]
  },
  name: {
    description: 'Course Name',
    validators: [
      validator('presence', {
        presence: true,
        message: 'Select a Course'
      })
    ]
  },
  logo: {
    description: 'Course Logo',
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
      validator('date'),
      validator('presence', {
        presence: true
      })
    ]
  },
})

export default DS.Model.extend(Validations, {
  name: DS.attr(),
  logo: DS.attr(),
  certificateLink: DS.attr(),
  courseMode: DS.attr(),
  organizationType: DS.attr(),
  organizationName: DS.attr(),
  organizationTypeSetter: Ember.computed('organizationType', {
    get() {
      const type = this.get('organizationType')
      switch (type) {
        case "codingblocks": return 'Coding Blocks'
        case "other": return 'Other'
      }
    },
    set(key, val) {
      this.set('name', null)
      this.set('logo', null)
      switch (val) {
        case "Coding Blocks": this.set('organizationType', 'codingblocks')
                              this.set('organizationName', 'Coding Blocks')
                              break;
        case "Other": this.set('organizationType', 'other')
                      this.set('organizationName', null)
                      break;
      }
      return val
    }
  }),
  startDate: DS.attr('number'),
  startDateString: Ember.computed('startDate', {
    get() {
      return moment.unix(this.get('startDate')).toDate()
    },
    set(key, val) {
      this.set('startDate', moment(val).unix())
      return moment(val)
    }
  }),
  endDate: DS.attr('number'),
  endDateString: Ember.computed('endDate', 'isCurrent', {
    get() {
      return moment.unix(this.get('endDate')).toDate()
    },
    set(key, val) {
      if (this.get('isCurrent')) {
        this.set('endDate', null)
      } else {
        this.set('endDate', moment(val).unix())
      }
      return moment(val)
    }
  }),
  isVerified: DS.attr(),
  amoebaCourseId: DS.attr('number'),
  applicantProfile: DS.belongsTo('applicant-profile'),
  skill: DS.belongsTo('skill')
});
