import RandExp from "randexp";
import { error } from "./utils";

export default function string({ nullable = false, pattern = /.*/ } = {}) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null && nullable) return;

    if (typeof value !== "string")
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not a string.`
      );

    if (!pattern.test(value))
      throw error(
        `Property \`${propName}\` of \`${componentName}\` doesn't match the pattern \`${pattern}\`. The value was \`${value}\`.`
      );
  }

  type.toString = function() {
    return "string()";
  };

  const randexp = new RandExp(pattern);

  type.make = function() {
    return randexp.gen();
  };

  return type;
}
