import unsigned from "./unsigned.mjs"
import { DecodeResult } from "./result.mjs"

const FLAG_NEGATIVE = 0b01000000;

function isNegativeNumber(result) {
  const { byteLength } = result;
  const topByte = result.bytes.getUint8(byteLength - 1);
  return (topByte & FLAG_NEGATIVE) === FLAG_NEGATIVE;
}

function decodeSignInformation(decodeResult) {
  let { value } = decodeResult;
  const { byteLength } = decodeResult;
  if (isNegativeNumber(decodeResult)) {
    value |= BigInt(~0 << byteLength * 7);
  }
  return value;
}

export function decode(bytes) {
  const result = unsigned.decode(bytes);
  const value = decodeSignInformation(result);
  return new DecodeResult(value, bytes.buffer, bytes.offset, bytes.byteLength);
}

export default { decode };