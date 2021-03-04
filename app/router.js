import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');
  this.route('logout');
  this.route('loading');
  this.route('404', { path: '/*:' });
  this.route('applicants', function () {
    this.route('profile', function () {
      this.route('id', { path: '/:user_id' });
      this.route('me');
      this.route('loading');
    });
    this.route('loading');
  });
  this.route('jobs', function () {
    this.route('id', { path: '/:job_id' }, function() {
      this.route('edit');
      this.route('applications');
    });
    this.route('search', function () {
      this.route('all');
      this.route('applied');
      this.route('my');
    });
    this.route('loading');
    this.route('new');
  });
  this.route('recruiter', function () {
    this.route('jobs', function () {
      this.route('id', { path: '/:job_id' });
    });
    this.route('profiles', function() {});
  });
  this.route('companies', function() {
    this.route('id', { path: '/:company_id' }, function() {
      this.route('edit');
    });

    this.route('search', function() {
      this.route('my');
    });
  });
});

export default Router;
