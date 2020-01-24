import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service(),
  store: service(),
  //type ie. company or applicant

  load() {
    const currentUser = this.get('user')
    if(currentUser && currentUser.get('id')){
      return Promise.resolve(currentUser)
    }
    
    return this.store.queryRecord('user', {custom: { ext: 'url', url:'me'}})
    .then(user => {
      this.set('user', user)
      return user
    })
  }
});
