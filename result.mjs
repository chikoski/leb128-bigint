export class DecodeResult {
  constructor(value, bytes, offset, size) {
    this.mValue = value;
    this.mData = new DataView(bytes, offset, size);
  }
  get value() {
    return this.mValue;
  }
  get byteLength() {
    return this.mData.byteLength;
  }
  valueOf() {
    return this.mValue;
  }
  toString(radix) {
    return this.mValue.toString(radix);
  }
  get bytes() {
    return this.mData;
  }
}

export default { DecodeResult }