import { DecodeResult } from "./result.mjs"

export function encode(value) {
  return 0n;
}
function createDataView(bytes, offset = 0) {
  if (bytes instanceof ArrayBuffer) {
    return new DataView(bytes, offset);
  } else if (bytes instanceof DataView) {
    return bytes; // XXX what happens when offset has non 0 value
  }
  throw new TypeError("An instance of ArrayBuffer / DataView should be specified as the first argument");
}

const FLAG_NEXT = 0b10000000;

export function decode(bytes, offset = 0) {
  const view = createDataView(bytes, offset);
  let hasNext = true;
  let decoded = 0n;
  let index = 0;
  for (index = 0; hasNext; index++) {
    const byte = view.getUint8(index);
    const value = BigInt((byte | FLAG_NEXT) ^ FLAG_NEXT);
    hasNext = (byte & FLAG_NEXT) === FLAG_NEXT;
    decoded |= value << BigInt(index * 7);
  }
  return new DecodeResult(decoded, view.buffer, view.byteOffset, index);
}

export default { decode, decode }