import { error } from "./utils";
export default function object(shape, { nullable = false, exact = true } = {}) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null && nullable) return;

    if (typeof value !== "object" || value == null)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not an object.`
      );

    const extraKeys = Object.keys(value).reduce((keys, key) => {
      const isIncluded = Object.keys(shape).includes(key);
      if (!isIncluded) keys.push(key);
      return keys;
    }, []);
    if (exact && extraKeys.length > 0)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` has extra properties \`${extraKeys.join(
          ", "
        )}\`.`
      );

    Object.keys(shape).forEach(key =>
      shape[key](value, key, `${componentName}.${propName}`)
    );
  }

  type.toString = function() {
    return "object()";
  };

  type.make = function make() {
    return Object.keys(shape).reduce((acc, key) => {
      acc[key] = shape[key].make ? shape[key].make() : shape[key];
      return acc;
    }, {});
  };

  type.extend = function extend(additionalShape) {
    return object({ ...shape, ...additionalShape });
  };

  return type;
}
