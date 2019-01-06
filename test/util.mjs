import assert from "power-assert";

export function is_function(object) {
  assert(typeof object === "function");
}

export function is_not_null(object) {
  assert(object !== null);
}

export function is_equal(a, b) {
  assert(a === b);
}

export function is_true(a) {
  assert(a);
}

function isMainModule() {
  return false; // XXX
}

function isOnNodeJS() {
  return global.window == null;
}

export function runIfMainModule(func) {
  if (isOnNodeJS() && isMainModule()) {
    func();
  }
}

export default { is_function, is_not_null, is_equal, is_true }