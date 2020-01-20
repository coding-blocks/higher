import { helper } from '@ember/component/helper';

export default helper(function includes(params/*, hash*/) {
  const [searchArray, toSearch] = params
  return searchArray.includes(toSearch)
});
