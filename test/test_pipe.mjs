import { Pipe } from "../pipe";
import { is_equal } from "./util";

function test_write_number(pipe = new Pipe()) {
  const expected = "08"
  pipe.write(8);
  const actual = pipe.dump();
  is_equal(actual, expected);
}

function test_write_hexString(pipe = new Pipe()) {
  const value = "808080fd07";
  pipe.write("808080fd07");
  const actual = pipe.dump();
  is_equal(actual, value);
}

export function all() {
  test_write_number();
  test_write_hexString();
}

export default { all }