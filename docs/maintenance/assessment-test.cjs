const assert = require('node:assert/strict');
const data = require('../../_data/analyst_assessment.json');
const {score, restore} = require('../../assets/js/assessment/core.js');
assert.equal(data.questions.length, 10);
assert.equal(new Set(data.questions.map(q => q.id)).size, 10);
for (const d of data.dimensions) assert.equal(data.questions.filter(q => q.dimension === d.id).length, 2);
for (const q of data.questions) {
  assert.equal(q.options.length, 4);
  assert.equal(q.options.filter(o => o.id === q.correct).length, 1);
  assert.ok(q.options.every(o => o.reason && o.text));
}
const correct = Object.fromEntries(data.questions.map(q => [q.id, q.correct]));
assert.equal(score(data, correct).percent, 100);
assert.equal(score(data, {}).correct, 0);
assert.equal(score(data, Object.fromEntries(data.questions.map(q => [q.id, 'unknown']))).correct, 0);
// Every one of the 1,024 correct/incorrect combinations obeys the same denominator.
for (let mask = 0; mask < 1024; mask++) {
  const answers = Object.fromEntries(data.questions.map((q, i) => [q.id, mask & (1 << i) ? q.correct : 'unknown']));
  const expected = mask.toString(2).replaceAll('0', '').length;
  const result = score(data, answers);
  assert.equal(result.correct, expected);
  assert.equal(result.percent, expected * 10);
  assert.equal(result.dimensions.reduce((n, d) => n + d.correct, 0), expected);
}
assert.equal(restore(data, '{broken'), null);
assert.equal(restore(data, JSON.stringify({version: 'old', answers: correct})), null);
assert.equal(restore(data, JSON.stringify({version: data.version, answers: correct, submitted: true})).submitted, true);
const invalid = restore(data, JSON.stringify({version: data.version, answers: {b1:'invalid'}, index:99, submitted:true}));
assert.deepEqual(invalid.answers, {}); assert.equal(invalid.index, 0); assert.equal(invalid.submitted, false);
console.log('Assessment checks passed: content structure, all 1,024 scoring combinations, and saved-state validation.');
