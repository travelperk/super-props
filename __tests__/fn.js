import { fn } from "../src";

describe("fn()", () => {
  it.each`
    value        | nullable | shouldThrow
    ${() => {}}  | ${true}  | ${false}
    ${undefined} | ${false} | ${true}
    ${undefined} | ${true}  | ${false}
    ${null}      | ${false} | ${true}
    ${null}      | ${true}  | ${false}
    ${1}         | ${true}  | ${true}
  `(
    "should generate a validator for function values",
    ({ value, nullable, shouldThrow }) => {
      const expectation = expect(() =>
        fn({ nullable })({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrowErrorMatchingSnapshot()
        : expectation.not.toThrow();
    }
  );
});
