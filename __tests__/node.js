import { node } from "../src";
import React from "react";

describe("node()", () => {
  it.each`
    value                      | options               | shouldThrow
    ${undefined}               | ${{}}                 | ${true}
    ${undefined}               | ${{ nullable: true }} | ${false}
    ${null}                    | ${{}}                 | ${false}
    ${null}                    | ${{ nullable: true }} | ${false}
    ${1}                       | ${{}}                 | ${false}
    ${"foo"}                   | ${{}}                 | ${false}
    ${true}                    | ${{}}                 | ${true}
    ${false}                   | ${{}}                 | ${false}
    ${{}}                      | ${{}}                 | ${true}
    ${[]}                      | ${{}}                 | ${false}
    ${["foo"]}                 | ${{}}                 | ${false}
    ${["foo", { bar: "baz" }]} | ${{}}                 | ${true}
    ${<div />}                 | ${{}}                 | ${false}
    ${<div>Hello</div>}        | ${{}}                 | ${false}
    ${<>
    <div />
    <div />
  </>} | ${{}} | ${false}
  `(
    "should generate a validator for Nodes with value $value and options $options",
    ({ value, options, shouldThrow }) => {
      const expectation = expect(() =>
        node(options)({ value }, "value", "Component")
      );
      shouldThrow
        ? expectation.toThrowErrorMatchingSnapshot()
        : expectation.not.toThrow();
    }
  );
});
