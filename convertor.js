import fs from 'fs';
import path from 'path';

import { toYAML, toJsonnet } from './extensions.js';

const args = process.argv.slice(2);
const input = args[0];
const output = path.dirname(input) + '/' + path.basename(input, path.extname(input));
const ext = path.extname(input);

const convert = async (input, output, ext) => {
  if (!fs.existsSync(input)) {
    console.error(`File ${input} does not exist`);
  }
  
  const content = fs.readFileSync(input, 'utf8');
  if (!content) {
    console.error(`File ${input} is empty`);
  }

  switch (ext) {
    case '.jsonnet':
      await toYAML(input, output, content);
      break;
    case '.yml':
      await toJsonnet(input, output, content);
      break;
    default:
      console.error(`File ${input} is not a jsonnet or yaml file`);
  }
}

convert(input, output, ext);
// usage: node convertor.js input.jsonnet
// usage: node convertor.js input.yml