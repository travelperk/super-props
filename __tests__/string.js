import { string } from "../src";

describe("string()", () => {
  describe("make()", () => {
    it("should generate a random string", () => {
      const patterns = [undefined, /a/i, /[0-9]{3}/];
      patterns.forEach(pattern => {
        expect(typeof string({ pattern }).make()).toBe("string");
      });
    });
  });

  it.each`
    value            | options                                    | shouldThrow
    ${undefined}     | ${{}}                                      | ${true}
    ${undefined}     | ${{ nullable: true }}                      | ${false}
    ${null}          | ${{}}                                      | ${true}
    ${null}          | ${{ nullable: true }}                      | ${false}
    ${{}}            | ${{}}                                      | ${true}
    ${1}             | ${{}}                                      | ${true}
    ${true}          | ${{}}                                      | ${true}
    ${""}            | ${{}}                                      | ${false}
    ${"a"}           | ${{}}                                      | ${false}
    ${"Hello world"} | ${{}}                                      | ${false}
    ${"Hello world"} | ${{ pattern: /Hello World/i }}             | ${false}
    ${"Hello world"} | ${{ pattern: /Hello World/ }}              | ${true}
    ${"Hello world"} | ${{ pattern: /Hello (world|TravelPerk)/ }} | ${false}
    ${"Hello world"} | ${{ pattern: /Hello TravelPerk/ }}         | ${true}
    ${"123"}         | ${{ pattern: /^[0-9]{3}$/ }}               | ${false}
    ${" 123 "}       | ${{ pattern: /^[0-9]{3}$/ }}               | ${true}
  `(
    "should generate a validator for string values with options $options and value $value",
    ({ value, options, shouldThrow }) => {
      const expectation = expect(() =>
        string(options)({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrowErrorMatchingSnapshot()
        : expectation.not.toThrow();
    }
  );
});
