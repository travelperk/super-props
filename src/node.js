import PropTypes from "prop-types";
import { error } from "./utils";

export default function node({ nullable = false } = {}) {
  function type(props, propName, componentName) {
    const value = props[propName];
    if (value === null) return;

    const validator = nullable ? PropTypes.node : PropTypes.node.isRequired;

    const validationError = validator(
      props,
      propName,
      componentName,
      "",
      "",
      "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
    );

    if (validationError) throw new error(validationError.message);
  }

  type.toString = function() {
    return "node()";
  };

  return type;
}
