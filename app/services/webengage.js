import Service from '@ember/service';

export default Service.extend({
  trackUser(user) {
    webengage.user.login(user.get('id'))
    webengage.user.setAttribute('hire_email', user.get('email'))
    webengage.user.login(user.get('hire_oneauth_id', user.get('oauth_id')))
  },
  
  trackEvent(event_name, meta) {
    webengage.track(event_name, {...meta})
  }
});
