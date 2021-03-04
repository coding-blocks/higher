import Route from '@ember/routing/route';


export default class JobsIdIndexRoute extends Route {


  async model(params) {
    return this.modelFor('jobs.id')
  }

  setupController(controller, model) {
    controller.set('job', model.job)
    controller.set('myApplication', model.myApplication)
    controller.set('applicantProfile', model.applicantProfile)
  }
}
