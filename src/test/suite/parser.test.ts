import { parser } from '../../parser/parser';
import { describe } from 'mocha';
import { expect } from 'chai';

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

    parser.feed(basicRules);

    expect(parser.results).to.be.an('array').with.length.gt(0);
  });
})

