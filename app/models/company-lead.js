import DS from 'ember-data';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      description: 'Name'
    })
  ],
  mobile: [
    validator('format', {
      type: 'phone',
      message: 'Mobile no. should be 10 digit number'
    }),
    validator('presence', {
      presence: true,
      description: 'Mobile'
    })
  ],
  companyName: [
    validator('presence', {
      presence: true,
      description: 'Company Name'
    })
  ],
  email: [
    validator('format', {
      type: 'email',
    }),
    validator('presence', {
      presence: true,
      description: 'Email'
    })
  ],
  hiringPosition: [
    validator('presence', {
      presence: true,
      description: 'Hiring Position'
    })
  ],

})

export default DS.Model.extend(Validations, {
  name: DS.attr(),
  mobile: DS.attr(),
  email: DS.attr(),
  companyName: DS.attr(),
  hiringPosition: DS.attr()
});
