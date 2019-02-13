import { array, string, number, oneOf } from "../src";

describe("array()", () => {
  describe("make()", () => {
    it("should generate an array of the given element", () => {
      const generatedArray = array(number(), {
        minLength: 2,
        maxLength: 2
      }).make();
      expect(generatedArray).toHaveLength(2);
    });
  });

  it.each`
    value         | shape                          | options                  | shouldThrow
    ${undefined}  | ${number()}                    | ${{}}                    | ${true}
    ${undefined}  | ${number()}                    | ${{ nullable: true }}    | ${false}
    ${null}       | ${number()}                    | ${{}}                    | ${true}
    ${null}       | ${number()}                    | ${{ nullable: true }}    | ${false}
    ${[]}         | ${number()}                    | ${{}}                    | ${false}
    ${[]}         | ${number()}                    | ${{ allowEmpty: false }} | ${true}
    ${[1]}        | ${number()}                    | ${{}}                    | ${false}
    ${[1, "foo"]} | ${number()}                    | ${{}}                    | ${true}
    ${[1, "foo"]} | ${oneOf([number(), string()])} | ${{}}                    | ${false}
    ${[1, "foo"]} | ${oneOf([number(), "foo"])}    | ${{}}                    | ${false}
    ${[1, "bar"]} | ${oneOf([number(), "foo"])}    | ${{}}                    | ${true}
    ${[1]}        | ${number()}                    | ${{ minLength: 2 }}      | ${true}
    ${[1, 2]}     | ${number()}                    | ${{ minLength: 2 }}      | ${false}
    ${[1]}        | ${number()}                    | ${{ maxLength: 2 }}      | ${false}
    ${[1, 2]}     | ${number()}                    | ${{ maxLength: 2 }}      | ${false}
    ${[1, 2, 3]}  | ${number()}                    | ${{ maxLength: 2 }}      | ${true}
    ${[1, 1]}     | ${number()}                    | ${{}}                    | ${false}
    ${[1, 1]}     | ${number()}                    | ${{ unique: true }}      | ${true}
  `(
    "should generate a validator for arrays with value $value, shape $shape and options $options",
    ({ value, shape, options, shouldThrow }) => {
      const expectation = expect(() =>
        array(shape, options)({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrowErrorMatchingSnapshot()
        : expectation.not.toThrow();
    }
  );
});
