import { boolean } from "../src";

describe("boolean()", () => {
  describe(".make()", () => {
    it("should generate a random boolean value", () => {
      expect(typeof boolean().make()).toBe("boolean");
    });
  });

  it.each`
    value        | nullable | shouldThrow
    ${true}      | ${true}  | ${false}
    ${false}     | ${true}  | ${false}
    ${undefined} | ${false} | ${true}
    ${undefined} | ${true}  | ${false}
    ${null}      | ${false} | ${true}
    ${null}      | ${true}  | ${false}
    ${1}         | ${true}  | ${true}
  `(
    "should generate a validator for boolean values",
    ({ value, nullable, shouldThrow }) => {
      const expectation = expect(() =>
        boolean({ nullable })({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrow(
            "Property `value` of `Component` is not a boolean."
          )
        : expectation.not.toThrow();
    }
  );
});
