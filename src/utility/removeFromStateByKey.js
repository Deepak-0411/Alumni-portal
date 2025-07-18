/**
 * Removes an item from one or more state arrays by matching a key and value.
 *
 * @param {Function|Function[]} setStates - A single or array of state setter functions
 * @param {String} key - The key to match on each item (e.g., "id" or "enrollmentNo")
 * @param {*} value - The value to match and remove
 */
export const removeFromStateByKey = (setStates, key, value) => {
  const setters = Array.isArray(setStates) ? setStates : [setStates];

  setters.forEach(setState => {
    setState(prev => prev.filter(item => item[key] !== value));
  });
};
