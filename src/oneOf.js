import { choose, error } from "./utils";

export default function oneOf(choices, { nullable = false } = {}) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null) {
      if (nullable) return;
      throw error(
        `Property \`${propName}\` of \`${componentName}\` can't be null or undefined.`
      );
    }

    const hasMatchingValue = choices.some(choice => {
      if (typeof choice === "function") {
        try {
          choice({ value }, "value", "");
          return true;
        } catch (e) {
          return false;
        }
      }
      return choice === value;
    });

    if (!hasMatchingValue)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is supposed to be one of \`${choices.join(
          ", "
        )}\`.`
      );
  }

  type.toString = function() {
    return `oneOf(${choices.join(", ")})`;
  };

  type.make = function() {
    const choice = choose(choices);
    return choice.make && typeof choice.make === "function"
      ? choice.make()
      : choice;
  };

  return type;
}
