import { error } from "./utils";
export default function object(shape, { nullable = false } = {}) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null && nullable) return;

    if (typeof value !== "object" || value == null)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not an object.`
      );

    Object.keys(shape).forEach(key =>
      shape[key](value, key, `${componentName}.${propName}`)
    );
  }

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
