/* Deterministic scoring and strict, versioned browser-state validation. */
(function (root) {
  'use strict';
  function score(data, answers) {
    var dimensions = data.dimensions.map(function (dimension) {
      var questions = data.questions.filter(function (q) { return q.dimension === dimension.id; });
      return { id: dimension.id, correct: questions.filter(function (q) { return answers[q.id] === q.correct; }).length, total: questions.length };
    });
    var total = dimensions.reduce(function (sum, d) { return sum + d.correct; }, 0);
    return { correct: total, total: data.questions.length, percent: Math.round(total / data.questions.length * 100), dimensions: dimensions };
  }
  function restore(data, raw) {
    try {
      var state = JSON.parse(raw);
      if (!state || state.version !== data.version || !state.answers || typeof state.answers !== 'object' || Array.isArray(state.answers)) return null;
      var answers = {};
      data.questions.forEach(function (q) {
        var value = state.answers[q.id];
        if (value === 'unknown' || q.options.some(function (o) { return o.id === value; })) answers[q.id] = value;
      });
      var validIndex = Number.isInteger(state.index) && state.index >= 0 && state.index < data.questions.length;
      return { version: data.version, answers: answers, index: validIndex ? state.index : 0, submitted: state.submitted === true && Object.keys(answers).length === data.questions.length };
    } catch (_) { return null; }
  }
  var api = { score: score, restore: restore };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AnalystScorecard = api;
}(typeof window !== 'undefined' ? window : this));
