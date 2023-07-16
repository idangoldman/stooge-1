import fs from 'fs';
import YAML from 'yaml';
import { Jsonnet } from '@hanazuki/node-jsonnet';

export const toYAML = async (filename, content) => {
  try {
    const jsonn = new Jsonnet();
    const json = await jsonn.evaluateSnippet(content);
    const jsObject = JSON.parse(json);
    const yml = YAML.stringify(jsObject);
    fs.writeFileSync(filename + '.yml', yml);
  } catch (err) {
    console.error(`File ${filename} is not a valid jsonnet file:`, err);
  }
}

export const toJsonnet = async (filename, content) => {
  try {
    const jsObject = YAML.parse(content);
    const jsonnetContent = JSON.stringify(jsObject, null, 2).replace(/"([^"]+)":/g, '$1:');
    fs.writeFileSync(filename + '.jsonnet', jsonnetContent);
  } catch (err) {
    console.error(`File ${filename} is not a valid yaml file:`, err);
  }
}