import { expect } from 'chai';
import * as fs from 'fs';
import { describe } from 'mocha';
import * as path from 'path';
import * as parser from '../../parser/parser';

describe('the parser', () => {
  test('can parse the basic structure', () => {
    const basicRules = `
      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /{document=**} {
            allow read, write: if false;
          }
        }
      }
    `.trim();

    const result = parser.parse(basicRules);

    expect(result).to.be.an('array').with.length.gt(0);
  });

  test('can parse the example rules', () => {
    const exampleRulesPath = path.resolve(__dirname + '/../../../src/test/example.rules');
    const exampleRules = fs.readFileSync(exampleRulesPath).toString();

    const result = parser.parse(exampleRules);

    expect(result).to.be.an('array').with.length.gt(0);
  });
})

