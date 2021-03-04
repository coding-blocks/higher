import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({})

export default DS.Model.extend(Validations, {
  user: DS.belongsTo('user')
});
