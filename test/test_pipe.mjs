import { Pipe } from "../pipe"
import { describe } from "test-harness"
import assert from "power-assert"

describe("Pipe#write allows us to write numbers into its buffer", function () {
  const pipe = new Pipe();
  const expected = "08"
  pipe.write(8);
  assert.equal(pipe.dump(), expected);
});

describe("Pipe#write allows us to write byte pattern in hex string", function () {
  const pipe = new Pipe();
  const value = "808080fd07";
  pipe.write("808080fd07");
  const actual = pipe.dump();
  assert.equal(actual, value);
});

export default {};