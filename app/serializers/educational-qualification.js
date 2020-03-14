import DS from 'ember-data';
import { isNone } from '@ember/utils';


export default DS.JSONAPISerializer.extend({
  serializeBelongsTo(snapshot, json, relationship) {
    let key = relationship.key;

    if (this._canSerialize(key)) {
      let belongsTo = snapshot.belongsTo(key);
      let belongsToIsNotNew = belongsTo && belongsTo.record;
      
      if (belongsTo === null || belongsToIsNotNew) {
        json.relationships = json.relationships || {};

        let payloadKey = this._getMappedKey(key, snapshot.type);
        if (payloadKey === key) {
          payloadKey = this.keyForRelationship(key, 'belongsTo', 'serialize');
        }

        let data = null;
        if (belongsTo) {
          let payloadType = this.payloadKeyFromModelName(belongsTo.modelName);

          data = {
            type: payloadType,
            id: belongsTo.id,
          };
        }
        
        json.relationships[payloadKey] = { data };

        if(key === 'college' || key === 'branch') {
          belongsTo.eachAttribute((key, attribute) => {
            this.serializeAttribute(belongsTo, json.relationships[payloadKey].data, key, attribute);
          })
        }
      }
    }
  }
});
