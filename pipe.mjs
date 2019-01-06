function createDataView(size = 8) {
  return new DataView(new ArrayBuffer(size));
}

function isString(value) {
  return typeof value === "string";
}

const hexNumberInString = /^(0[x])?[0-9,a,b,c,d,e,f]+$/i
function isHexNumbeInString(text) {
  return isString(text) && hexNumberInString.test(text);
}

export function createDataViewFrom(pattern) {
  const length = pattern.length / 2 + pattern.length % 2;
  const buffer = new DataView(new ArrayBuffer(length));
  pattern.match(/.{1,2}/g)
    .map(i => "0x" + i)
    .reverse()
    .forEach((value, index) => {
      const n = Number(value);
      buffer.setUint8(index, n);
    });
  return buffer;
}

export class Pipe {
  constructor() {
    this.reset();
  }
  get buffer() {
    return this.mWriter;
  }
  write(bytes) {
    if (bytes instanceof ArrayBuffer) {
      this.mWriter = new DataView(bytes);
      this.consumed = bytes.byteLength;
    } else if (bytes instanceof DataView) {
      this.mWriter = bytes;
      this.consumed = bytes.byteLength - bytes.byteOffset;
    } else if (isHexNumbeInString(bytes)) {
      this.mWriter = createDataViewFrom(bytes);
      this.consumed = this.mWriter.byteLength - this.mWriter.byteOffset;
    } else {
      this.mWriter.setUint8(this.consumed, bytes);
      this.consumed += 1;
    }
  }
  read() {
    const result = this.buffer;
    this.reset();
    return result;
  }
  reset() {
    this.consumed = 0;
    this.mWriter = createDataView();
  }
  dump() {
    // assumes little endian
    let result = "";
    const buffer = this.mWriter;
    const length = this.consumed;
    for (let i = 0; i < length; i++) {
      const value = buffer.getUint8(i);
      result = value.toString(16).padStart(2, "0") + result;
    }
    return result;
  }
}

Pipe.create = function (bytes) {
  const p = new Pipe();
  p.write(bytes);
  return p;
};

export default { Pipe }