import { number } from "../src";

describe("number()", () => {
  describe(".make()", () => {
    it("should generate a random number value", () => {
      expect(typeof number().make()).toBe("number");
      expect(number({ min: 0 }).make()).toBeGreaterThanOrEqual(0);
      const integer = number({ integer: true }).make();
      expect(integer).toBe(Math.round(integer));
    });
  });

  it.each`
    value        | options                | shouldThrow
    ${1}         | ${{}}                  | ${false}
    ${1}         | ${{ integer: true }}   | ${false}
    ${1}         | ${{ integer: false }}  | ${false}
    ${1.1}       | ${{ integer: false }}  | ${false}
    ${1.1}       | ${{ integer: true }}   | ${true}
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
    "should generate a validator for number values with options $options and value $value",
    ({ value, options, shouldThrow }) => {
      const expectation = expect(() =>
        number(options)({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrowErrorMatchingSnapshot()
        : expectation.not.toThrow();
    }
  );
});
