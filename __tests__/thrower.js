import { thrower } from "../src";
import { TOKEN } from "../src/utils";

describe("thrower()", () => {
  let errorSpy;
  beforeEach(
    () => (errorSpy = jest.spyOn(console, "error").mockImplementation())
  );
  afterEach(() => errorSpy.mockRestore());

  it("should throw errors on console.error that include TOKEN", () => {
    thrower(true);
    expect(() => console.error(`${TOKEN} one`)).toThrow(`${TOKEN} one`);
    expect(() => console.error(`one`)).not.toThrow();
  });

  it("should not throw errors on console.error when called with false", () => {
    thrower(false);
    expect(() => console.error(`${TOKEN} one`)).not.toThrow();
    expect(() => console.error(`one`)).not.toThrow();
  });
});
