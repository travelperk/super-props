import { email } from "../src";

describe("email()", () => {
  describe("make()", () => {
    it("should generate a random email", () => {
      const patterns = [undefined, /a/i, /[0-9]{3}/];
      patterns.forEach(pattern => {
        expect(typeof email({ pattern }).make()).toBe("string");
      });
    });
  });

  it.each`
    value               | options               | shouldThrow
    ${undefined}        | ${{}}                 | ${true}
    ${undefined}        | ${{ nullable: true }} | ${false}
    ${null}             | ${{}}                 | ${true}
    ${null}             | ${{ nullable: true }} | ${false}
    ${{}}               | ${{}}                 | ${true}
    ${1}                | ${{}}                 | ${true}
    ${true}             | ${{}}                 | ${true}
    ${""}               | ${{}}                 | ${true}
    ${"a"}              | ${{}}                 | ${true}
    ${"Hello world"}    | ${{}}                 | ${true}
    ${"hello@test.com"} | ${{}}                 | ${false}
    ${"hello@test"}     | ${{}}                 | ${false}
    ${"hello@"}         | ${{}}                 | ${true}
  `(
    "should generate a validator for string values with options $options and value $value",
    ({ value, options, shouldThrow }) => {
      const expectation = expect(() =>
        email(options)({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrowErrorMatchingSnapshot()
        : expectation.not.toThrow();
    }
  );
});
