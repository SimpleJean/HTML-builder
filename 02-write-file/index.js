const path = require('path');
const fs = require('fs');
const rl = require('readline');
const process = require('process');

const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const newStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
newStream.on('error', (err) => console.log(`Error happened: ${err}`));

console.log('Please type something:');

readLine.on('line', (data) => {
  data === 'exit' ? dataEntryCompletion() : newStream.write(data);
});

readLine.on('SIGINT', () => {
  dataEntryCompletion();
});

const dataEntryCompletion = () => {
  console.log('The typing is finished, bye!');
  newStream.end();
  readLine.close();
  process.exit(0);
};
