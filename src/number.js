import { randomNumber, error } from "./utils";

export default function number({
  nullable = false,
  integer = false,
  min,
  max
} = {}) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null && nullable) return;

    if (typeof value !== "number")
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not a number.`
      );

    if (integer && Math.round(value) !== value)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not an integer.`
      );

    if (max != null && value > max)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is supposed to be smaller than ${max}. It was ${value}.`
      );
    if (min != null && value < min)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is supposed to be bigger than ${min}. It was ${value}.`
      );
  }

  type.toString = function() {
    return "number()";
  };

  type.make = function make() {
    return randomNumber({ integer, min, max });
  };

  return type;
}
