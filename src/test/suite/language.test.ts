import * as assert from 'assert';
import * as path from 'path';
import * as fs from 'fs';

test('the language grammar file can be parsed', () => {
    const grammarPath = path.resolve(__dirname + '/../../../syntaxes/firestorerules.tmLanguage.json');
    const grammarJSON = fs.readFileSync(grammarPath).toString();

    const result = JSON.parse(grammarJSON);

    assert.equal(true, result !== null && typeof result === 'object');
});
