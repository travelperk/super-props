import { error } from "./utils";

export default function fn({ nullable = false } = {}) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null && nullable) return;

    if (typeof value !== "function")
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not a function.`
      );
  }

  type.toString = function() {
    return "fn()";
  };

  return type;
}
