import { error, choose } from "./utils";

export default function boolean(
  { nullable = false } = {},
  staticValue = undefined
) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null && nullable) return;

    if (typeof value !== "boolean")
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not a boolean.`
      );

    if (staticValue != null && value !== staticValue)
      throw new Error(
        `Property \`${propName}\` of \`${componentName}\` is not \`${staticValue}\``
      );
  }

  type.toString = function() {
    return "boolean()";
  };

  type.make = function make() {
    return staticValue != null ? staticValue : choose([true, false]);
  };

  return type;
}
