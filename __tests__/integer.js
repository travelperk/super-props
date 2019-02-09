import { integer } from "../src";

describe("integer()", () => {
  describe(".make()", () => {
    it("should generate a random number value", () => {
      expect(typeof integer().make()).toBe("number");
      expect(integer({ min: 0 }).make()).toBeGreaterThanOrEqual(0);
      const number = integer().make();
      expect(number).toBe(Math.round(number));
    });
  });

  it.each`
    value        | options                | shouldThrow
    ${1}         | ${{}}                  | ${false}
    ${1.1}       | ${{}}                  | ${true}
    ${"1"}       | ${{}}                  | ${true}
    ${0}         | ${{ min: 1 }}          | ${true}
    ${0}         | ${{ min: 0 }}          | ${false}
    ${0}         | ${{ max: 0 }}          | ${false}
    ${0}         | ${{ max: -1 }}         | ${true}
    ${0}         | ${{ min: -1, max: 1 }} | ${false}
    ${0}         | ${{ min: 1, max: 2 }}  | ${true}
    ${undefined} | ${{ nullable: true }}  | ${false}
    ${undefined} | ${{ nullable: false }} | ${true}
    ${null}      | ${{ nullable: true }}  | ${false}
    ${null}      | ${{ nullable: false }} | ${true}
  `(
    "should generate a validator for integer values with options $options",
    ({ value, options, shouldThrow }) => {
      const expectation = expect(() =>
        integer(options)({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrowErrorMatchingSnapshot()
        : expectation.not.toThrow();
    }
  );
});
