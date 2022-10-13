import { get } from '@ember/object';
import { isPresent } from '@ember/utils';

/**
 * Get the options by selecting the keys from the object. If the key is not defined,
 * then it is not included in the options.
 * *
 * @param obj
 * @param keys
 * @return {{}}
 */
export default function getOptions (obj, keys) {
  const options = {};

  keys.forEach (key => {
    const value = get (obj, key);

    if (isPresent (value)) {
      options[key] = value;
    }
  });

  return options;
}