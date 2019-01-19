import leb128 from "../index.mjs";
import { Pipe } from "../pipe";
import assert from "power-assert";
import { describe } from "test-harness";

const table = new Map([
  [Pipe.create("02"), 2n],
  [Pipe.create("7e"), -2n],
  [Pipe.create("00ff"), 127n],
  [Pipe.create("0180"), 128n],
  [Pipe.create("7f80"), -128n]
]);

describe("leb128.signed.decode decodes LEB128 encoded bytes into unsigned integer", function () {
  for (const [pipe, expected] of table.entries()) {
    console.log(`decoding ${pipe.dump()}`);
    const actual = leb128.signed.decode(pipe.buffer).value;
    console.log(`(expected, actual) = (${expected}, ${actual})`);
    assert.equal(actual, expected);
  }
});

export default {}