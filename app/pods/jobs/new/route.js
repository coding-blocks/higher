import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('job', {
      isAccepting: true,
      type: 'fulltime',
      status: 'draft',
      experienceType: 'not_required',
      isForNonCb: false,
      form: JSON.stringify([])
    })
  }
});
