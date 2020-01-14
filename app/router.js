import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route('users', function() {
    this.route('id', { path: '/:user_id'});
  });
  this.route('loading');
  this.route('404', { path: '/*:' });
});

export default Router;
