import { string } from ".";

export default function email(options) {
  const pattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;

  const type = string({ ...options, pattern });

  type.toString = function() {
    return "string()";
  };

  return type;
}
