import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route('loading');
  this.route('404', { path: '/*:' });
  this.route('applicants', function() {
    this.route('profile', function() {
      this.route('id', { path: '/:user_id' });
      this.route('me');
    });
  });
  this.route('jobs', function() {
    this.route('id', { path: '/:job_id' });
    this.route('search', function() {
      this.route('all');
      this.route('applied');
    });
    this.route('loading');
  });
  this.route('recruiter', function() {});
});

export default Router;
