import { boolean } from ".";
import { error } from "./utils";

export default function value(literalValue) {
  if (typeof literalValue === "object" && literalValue !== null)
    throw new Error("literal value can't be an object");

  if (typeof literalValue === "function")
    throw new Error("literal value can't be a function");

  function type(props, propName, componentName) {
    const value = props[propName];

    if (value !== literalValue)
      throw error(
        `Property \`${propName}.\` of \`${componentName}\` was supposed to be \`${literalValue}\` but was \`${value}\`.`
      );
  }

  type.make = function() {
    return literalValue;
  };

  type.toString = function() {
    return `literal(${literalValue})`;
  };

  return type;
}
