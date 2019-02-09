import number from "./number";

export default function integer(opts = {}) {
  const type = number({ integer: true, ...opts });

  type.toString = function() {
    return "integer()";
  };

  return type;
}
