import { error } from "./utils";
import { randomNumber } from "./utils";

export default function array(
  shape,
  {
    nullable = false,
    allowEmpty = true,
    minLength = 0,
    maxLength = Infinity,
    unique = false
  } = {}
) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value == null && nullable) return;

    if (!Array.isArray(value))
      throw error(
        `Property \`${propName}\` of \`${componentName}\` is not an array.`
      );

    if (value.length === 0 && !allowEmpty)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` can't be an empty array.`
      );

    if (value.length < minLength)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` can't be shorter than ${minLength}.`
      );

    if (value.length > maxLength)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` can't be longer than ${maxLength}.`
      );

    value.forEach((item, index) => {
      shape({ [index]: item }, index, `${componentName}[]`);
    });

    if (unique && value.length !== Array.from(new Set(value)).length)
      throw error(
        `Property \`${propName}\` of \`${componentName}\` has repeated values.`
      );
  }

  type.toString = function() {
    return `array(${shape})`;
  };

  type.make = function() {
    const length = randomNumber({
      min: minLength,
      max: maxLength === Infinity ? 10 : maxLength,
      integer: true
    });

    const generatedArray = [];
    for (let i = 0; i < length; i++) {
      let element;
      do {
        element = shape.make();
      } while (unique && isElementInArray(element, generatedArray));
      generatedArray.push(element);
    }
    return generatedArray;
  };

  return type;
}

function isElementInArray(element, array) {
  return array.some(e => e === element);
}
