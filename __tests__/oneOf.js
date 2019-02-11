import { oneOf, number, string, integer } from "../src";

describe("oneOf()", () => {
  describe("make()", () => {
    it("should generate a random element from the list", () => {
      const choices = ["foo", "bar", "baz"];
      for (let i = 0; i < 10; i++)
        expect(choices).toContain(oneOf(choices).make());
    });

    it("should generate a rnadom element with types", () => {
      const choices = [number(), string()];
      for (let i = 0; i < 10; i++) {
        expect(["number", "string"]).toContain(typeof oneOf(choices).make());
      }
    });

    it("should generate a rnadom element mixing types and literals", () => {
      const choices = [number(), "foo", "bar"];
      for (let i = 0; i < 10; i++) {
        expect(["number", "string"]).toContain(typeof oneOf(choices).make());
      }
    });
  });

  it.each`
    value        | choices                      | options               | shouldThrow
    ${undefined} | ${["foo"]}                   | ${undefined}          | ${true}
    ${undefined} | ${["foo"]}                   | ${{ nullable: true }} | ${false}
    ${null}      | ${["foo"]}                   | ${undefined}          | ${true}
    ${null}      | ${["foo"]}                   | ${{ nullable: true }} | ${false}
    ${"foo"}     | ${["foo", "bar"]}            | ${undefined}          | ${false}
    ${"baz"}     | ${["foo", "bar"]}            | ${undefined}          | ${true}
    ${"foo"}     | ${["foo", "bar", number()]}  | ${undefined}          | ${false}
    ${1}         | ${["foo", "bar", number()]}  | ${undefined}          | ${false}
    ${1.1}       | ${["foo", "bar", integer()]} | ${undefined}          | ${true}
  `(
    "should generate a validator for oneOf with value $value, choices $choices and options $options",
    ({ value, choices, options, shouldThrow }) => {
      const expectation = expect(() =>
        oneOf(choices, options)({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrowErrorMatchingSnapshot()
        : expectation.not.toThrow();
    }
  );
});
