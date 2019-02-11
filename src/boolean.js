import { error, choose } from "./utils";

export default function boolean({ nullable = false } = {}) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null && nullable) return;

    if (typeof value !== "boolean")
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not a boolean.`
      );
  }

  type.toString = function() {
    return "boolean()";
  };

  type.make = function make() {
    return choose([true, false]);
  };

  return type;
}
