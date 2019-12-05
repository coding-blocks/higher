import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  currentCtc: DS.attr('number'),
  expectedCtc: DS.attr('number'),
  joiningDate: DS.attr('number'),
  joiningDateString: Ember.computed('joiningDate', {
    get() {
      return moment.unix(this.get('joiningDate')).toDate()
    },
    set(key, val) {
      this.set('joiningDate', moment(val).unix())
      return val
    }
  }),
  about: DS.attr(),
  photo: DS.attr(),
  links: DS.attr(),
  isStudent: DS.attr('boolean'),
  isStudentSetter: Ember.computed({
    get() {
      return this.get('isStudent')
    },
    set(key, val) {
      if(val) {
        this.set('currentCtc', null)
        this.set('expectedCtc', null)
      }
      this.set('isStudent', val)
      return val
    }
  }),
  isReviewed: DS.attr('boolean'),
  isActive: DS.attr('boolean'),
  jobRoles: DS.hasMany('job-role'),
  locations: DS.hasMany('location'),
  currentLocation: DS.belongsTo('location', { inverse: 'studentProfile' }),
  workExperiences: DS.hasMany('work-experience'),
  projects: DS.hasMany('project'),
  educationalQualifications: DS.hasMany('educational-qualification'),
  profileCompletion: DS.attr('number'),
  user: DS.belongsTo('user')
});
