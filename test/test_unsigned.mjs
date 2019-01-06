import leb128 from "../index.mjs";
import { is_not_null, is_function, runIfMainModule, is_equal } from "./util.mjs";
import { Pipe } from "../pipe";

const table = new Map([
  [Pipe.create("8"), 8n],
  [Pipe.create("7f"), 127n],
  [Pipe.create("0180"), 128n],
  [Pipe.create("0181"), 129n],
  [Pipe.create("64b9"), 12857n]
]);

export function test_signature() {
  is_not_null(leb128.unsigned);
  is_function(leb128.unsigned.decode);
}

export function test_decode() {
  for (const [pipe, expected] of table.entries()) {
    console.log(`decoding ${pipe.dump()}`);
    const actual = leb128.unsigned.decode(pipe.buffer).value;
    console.log(`(expected, actual) = (${expected}, ${actual})`);
    is_equal(actual, expected);
  }
}

export function all() {
  test_signature();
  test_decode();
}

runIfMainModule(all);

export default { test_signature, test_decode, all }