const { ReverseReader } = require('./build/Release/reverse_reader');

const reader = new ReverseReader('../sampple_log_dir/test');

let line;
while ((line = reader.readLine()) !== undefined) {
  console.log(line);
}
