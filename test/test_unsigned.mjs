import leb128 from "../index.mjs"
import { Pipe } from "../pipe"
import assert from "power-assert"
import { describe } from "test-harness"

const table = new Map([
  [Pipe.create("8"), 8n],
  [Pipe.create("7f"), 127n],
  [Pipe.create("0180"), 128n],
  [Pipe.create("0181"), 129n],
  [Pipe.create("64b9"), 12857n]
]);

describe("leb128.signed.decode docodes LEB128 encoded bytes into signed integer", function () {
  for (const [pipe, expected] of table.entries()) {
    console.log(`decoding ${pipe.dump()}`);
    const actual = leb128.unsigned.decode(pipe.buffer).value;
    console.log(`(expected, actual) = (${expected}, ${actual})`);
    assert.equal(actual, expected);
  }
})

export default {}