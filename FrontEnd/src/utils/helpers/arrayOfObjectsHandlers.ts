import { isEqual, findIndex } from 'lodash';

//add item to array if it doesn't exist or remove if it does.
//only works with same types
export const handleAddOrRemoveFromArray = <Type>(array: Array<Type>, newItem: Type) => {
  const duplicate = array.some((x) => isEqual(x, newItem));
  if (duplicate) {
    return array.filter((item) => JSON.stringify(item) !== JSON.stringify(newItem));
  } else {
    return array.concat(newItem);
  }
};

//remove item from array if it exist
export const removeFromArray = <Type>(array: Array<Type>, newItem: Type) => {
  const duplicate = array.some((x) => isEqual(x, newItem));
  if (duplicate) {
    return array.filter((item) => JSON.stringify(item) !== JSON.stringify(newItem));
  } else {
    return array;
  }
};

//only add to array if item does not already exist
export const addToArray = <Type>(array: Array<Type>, newItem: Type) => {
  const duplicate = array.some((x) => isEqual(x, newItem));
  if (duplicate) {
    return array;
  } else {
    return array.concat(newItem);
  }
};
