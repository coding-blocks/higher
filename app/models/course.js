import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  logo: DS.attr(),
  coverImage: DS.attr()
});
