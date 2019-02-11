import { object, integer, boolean, string, email, literal } from "../src";

describe("object()", () => {
  describe("make()", () => {
    it("should generate a random object", () => {
      const user = object({ id: integer({ min: 0 }), isAdmin: literal(false) });
      expect(user.make().id).toBeGreaterThanOrEqual(0);
      expect(user.make().isAdmin).toBe(false);

      const admin = user.extend({ isAdmin: literal(true) });
      expect(admin.make().id).toBeGreaterThanOrEqual(0);
      expect(admin.make().isAdmin).toBe(true);
    });

    it.each`
      value                                                                 | shape                                                                                      | options                | shouldThrow
      ${{}}                                                                 | ${{}}                                                                                      | ${undefined}           | ${false}
      ${true}                                                               | ${{}}                                                                                      | ${undefined}           | ${true}
      ${1}                                                                  | ${{}}                                                                                      | ${undefined}           | ${true}
      ${"hello"}                                                            | ${{}}                                                                                      | ${undefined}           | ${true}
      ${{ id: 1 }}                                                          | ${{ id: integer() }}                                                                       | ${undefined}           | ${false}
      ${{ id: 1.5 }}                                                        | ${{ id: integer() }}                                                                       | ${undefined}           | ${true}
      ${{ id: 1 }}                                                          | ${{ id: integer(), isAdmin: boolean() }}                                                   | ${undefined}           | ${true}
      ${{ id: 1 }}                                                          | ${{ id: integer(), isAdmin: boolean({ nullable: true }) }}                                 | ${undefined}           | ${false}
      ${{ id: 1, isAdmin: true }}                                           | ${{ id: integer(), isAdmin: boolean({ nullable: true }) }}                                 | ${undefined}           | ${false}
      ${{ id: 1, isAdmin: true }}                                           | ${{ id: integer(), isAdmin: literal(true) }}                                               | ${undefined}           | ${false}
      ${{ id: 1, isAdmin: true, name: "Max", email: "max@travelperk.com" }} | ${{ id: integer(), isAdmin: boolean({ nullable: true }), name: string(), email: email() }} | ${undefined}           | ${false}
      ${undefined}                                                          | ${{}}                                                                                      | ${{ nullable: true }}  | ${false}
      ${undefined}                                                          | ${{}}                                                                                      | ${{ nullable: false }} | ${true}
      ${null}                                                               | ${{}}                                                                                      | ${{ nullable: true }}  | ${false}
      ${null}                                                               | ${{}}                                                                                      | ${{ nullable: false }} | ${true}
    `(
      "should generate a validator for objects values with shape $shape, options $options and value $value",
      ({ value, shape, options, shouldThrow }) => {
        const expectation = expect(() =>
          object(shape, options)({ value }, "value", "Component")
        );
        shouldThrow
          ? expectation.toThrowErrorMatchingSnapshot()
          : expectation.not.toThrow();
      }
    );
  });
});
