import TCPipe from "./test_pipe.mjs"
import TCUnsigned from "./test_unsigned.mjs"
import TCSigned from "./test_signed.mjs"


const all = new Map([
  ["Pipe", TCPipe.all],
  ["LEB128::Unsined", TCUnsigned.all],
  ["LEB128::Signed", TCSigned.all]
]);

function run() {
  console.log("Starting all test cases");
  for (const [title, tc] of all.entries()) {
    console.log(`Start ${title}`);
    tc();
  }
}
run();