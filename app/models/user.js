import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  userType: DS.attr(),
  name: DS.attr(),
  username: DS.attr(),
  firstname: DS.attr(),
  lastname: DS.attr(),
  // fullName: computed('firstname', 'lastname', function () {
  //   return this.firstname + ' ' + this.lastname
  // }),
  email: DS.attr(),
  college: DS.attr(),
  organization: DS.attr(),
  hackJwt: DS.attr(),
  lastReadNotification: DS.attr(),
  photo: DS.attr(),
  oneauthId: DS.attr(),
  verifiedemail: DS.attr(),
  verifiedMobile: DS.attr(),
  applicantProfile: DS.belongsTo('applicant-profile')
});
