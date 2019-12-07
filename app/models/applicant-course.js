import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  name: DS.attr(),
  logo: DS.attr(),
  certificateLink: DS.attr(),
  courseMode: DS.attr(),
  organizationName: DS.attr(),
  organizationType: DS.attr(),
  organizationTypeSetter: Ember.computed('organizationType', {
    get() {
      const type = this.get('organizationType')
      switch (type) {
        case "codingblocks": return 'Coding Blocks'
        case "other": return 'Other'
      }
    },
    set(key, val) {
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
  startDate: DS.attr(),
  startDateString: Ember.computed('startDate', {
    get() {
      return moment.unix(this.get('startDate')).toDate()
    },
    set(key, val) {
      this.set('startDate', moment(val).unix())
      return moment(val)
    }
  }),
  endDate: DS.attr(),
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
  applicantProfile: DS.belongsTo('applicant-profile')
});
