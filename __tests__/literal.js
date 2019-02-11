import { literal } from "../src";

describe("literal()", () => {
  const values = [true, false, null, undefined, "foo", 1, 1.2];

  describe("make()", () => {
    it.each(values)("should return the passed value %p", value => {
      expect(literal(value).make()).toBe(value);
    });
  });

  it.each(values)("should validate the passed value %p", value => {
    const valueType = literal(value);
    values.forEach(testValue => {
      if (testValue === value)
        expect(() =>
          valueType({ testValue }, "testValue", "Component")
        ).not.toThrow();
      else
        expect(() =>
          valueType({ testValue }, "testValue", "Component")
        ).toThrowErrorMatchingSnapshot();
    });
  });

  it("should throw if it recieves an object", () => {
    expect(() => literal({})).toThrow();
    expect(() => literal({ foo: "bar" })).toThrow();
  });

  it("should throw if it recieves a function", () => {
    expect(() => literal(() => {})).toThrow();
  });
});
