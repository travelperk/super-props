import React from "react";
import { render, cleanup } from "react-testing-library";
import PropTypes from "prop-types";
import {
  thrower,
  number,
  integer,
  boolean,
  string,
  email,
  object,
  literal,
  fn,
  array,
  node
} from "../src";

let errorSpy;
beforeEach(() => {
  errorSpy = jest.spyOn(console, "error").mockImplementation();
  PropTypes.resetWarningCache();
});
afterEach(() => {
  errorSpy.mockRestore();
  cleanup();
});

test.each`
  type                                                          | value                                            | shouldThrow
  ${number()}                                                   | ${undefined}                                     | ${true}
  ${number({ nullable: true })}                                 | ${undefined}                                     | ${false}
  ${number()}                                                   | ${null}                                          | ${true}
  ${number()}                                                   | ${true}                                          | ${true}
  ${number()}                                                   | ${false}                                         | ${true}
  ${number()}                                                   | ${1}                                             | ${false}
  ${number()}                                                   | ${1.1}                                           | ${false}
  ${number()}                                                   | ${"1"}                                           | ${true}
  ${number()}                                                   | ${{ foo: 1 }}                                    | ${true}
  ${integer()}                                                  | ${1}                                             | ${false}
  ${integer()}                                                  | ${1.1}                                           | ${true}
  ${boolean()}                                                  | ${true}                                          | ${false}
  ${boolean()}                                                  | ${false}                                         | ${false}
  ${boolean()}                                                  | ${undefined}                                     | ${true}
  ${boolean()}                                                  | ${1}                                             | ${true}
  ${string()}                                                   | ${1}                                             | ${true}
  ${string()}                                                   | ${"1"}                                           | ${false}
  ${string()}                                                   | ${"foo"}                                         | ${false}
  ${email()}                                                    | ${"foo"}                                         | ${true}
  ${email()}                                                    | ${"foo@bar.com"}                                 | ${false}
  ${object({ id: number(), email: email() })}                   | ${{ id: 1, email: "foo@bar.com" }}               | ${false}
  ${object({ id: number(), email: email() })}                   | ${{ id: 1, email: "foo@bar.com", name: "John" }} | ${true}
  ${object({ id: number(), email: email() }, { exact: false })} | ${{ id: 1, email: "foo@bar.com", name: "John" }} | ${false}
  ${object({ id: number(), admin: literal(true) })}             | ${{ id: 1, admin: true }}                        | ${false}
  ${object({ id: number(), admin: literal(true) })}             | ${{ id: 1, admin: false }}                       | ${true}
  ${fn()}                                                       | ${() => {}}                                      | ${false}
  ${node()}                                                     | ${<div />}                                       | ${false}
  ${node()}                                                     | ${undefined}                                     | ${true}
  ${array(number())}                                            | ${[1]}                                           | ${false}
  ${array(number())}                                            | ${["foo"]}                                       | ${true}
`(
  "a component that expects a property $type and receives value $value should throw: $shouldThrow",
  ({ type, value, shouldThrow }) => {
    const Foo = function() {
      return null;
    };
    Foo.propTypes = { value: type };

    const { rerender } = render(React.createElement(Foo, { value }));
    expect(errorSpy).toHaveBeenCalledTimes(shouldThrow ? 1 : 0);
  }
);
