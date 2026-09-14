(function () {
  'use strict';
  var root = document.getElementById('assessment');
  if (!root) return;
  var data = JSON.parse(document.getElementById('assessment-data').textContent);
  var screen = document.getElementById('screen');
  var status = document.getElementById('status');
  var key = 'dc-analyst-assessment';
  var consentKey = 'dc-assessment-measurement';
  var storageOK = true;
  function read(k) { try { return localStorage.getItem(k); } catch (_) { storageOK = false; return null; } }
  function write(k, value) { try { localStorage.setItem(k, value); } catch (_) { storageOK = false; status.textContent = 'Progress cannot be saved in this browser. You can still finish and print your scorecard.'; } }
  function fresh() { return { version: data.version, answers: {}, index: 0, submitted: false }; }
  var state = AnalystScorecard.restore(data, read(key)) || fresh();
  var consent = read(consentKey) === 'yes';
  var analyticsStarted = false;
  function save() { write(key, JSON.stringify(state)); }
  function track(name, params) {
    if (!consent || !analyticsStarted || typeof window.gtag !== 'function') return;
    window.gtag('event', name, Object.assign({ assessment_version: data.version }, params || {}));
  }
  function enableAnalytics() {
    var id = root.dataset.analyticsId;
    if (!consent || analyticsStarted || !/^G-[A-Z0-9]+$/.test(id)) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
    var script = document.createElement('script');
    script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script); analyticsStarted = true;
  }
  var measurement = document.getElementById('measurement');
  measurement.checked = consent;
  measurement.addEventListener('change', function () {
    consent = measurement.checked; write(consentKey, consent ? 'yes' : 'no');
    if (consent) enableAnalytics();
    else if (analyticsStarted) { save(); location.reload(); }
  });
  enableAnalytics();
  function el(tag, text, className) {
    var node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function button(text, action, primary) {
    var node = el('button', text, 'btn' + (primary ? ' btn--primary' : ' btn--inverse'));
    node.type = 'button'; node.addEventListener('click', action); return node;
  }
  function clear(title, focus) {
    screen.replaceChildren(); screen.className = ''; status.textContent = storageOK ? '' : 'Progress cannot be saved in this browser. Keep this tab open until you finish.';
    var heading = el('h2', title); heading.tabIndex = -1; screen.appendChild(heading); if (focus !== false) heading.focus();
  }
  function actions() { var row = el('div', undefined, 'assessment-actions'); screen.appendChild(row); return row; }
  function accelerator(parent) {
    var box = el('section', undefined, 'assessment-next');
    box.setAttribute('aria-labelledby', 'assessment-next-title');
    box.appendChild(el('p', 'YOUR NEXT STEP', 'assessment-eyebrow'));
    var title = el('h3', 'Senior Data Analyst Accelerator'); title.id = 'assessment-next-title'; box.appendChild(title);
    box.appendChild(el('p', 'Build the judgment behind senior analytics work. Connect data, engineering, and business decisions through practical, guided learning.'));
    var row = el('div', undefined, 'assessment-cta-actions');
    function link(text, url, className, event) {
      var item = el('a', text, className); item.href = url;
      item.addEventListener('click', function () { track(event); }); return item;
    }
    row.appendChild(link('Enroll in the programme', root.dataset.checkoutUrl, 'btn btn--primary', 'assessment_enroll_click'));
    row.appendChild(link('Request a 15-minute call', root.dataset.callUrl, 'btn btn--inverse', 'assessment_call_click'));
    box.appendChild(row);
    box.appendChild(el('p', 'Not sure it’s the right fit? Talk with Antonis about your experience and goals.', 'assessment-call-note'));
    box.appendChild(link('Explore the programme →', root.dataset.acceleratorUrl, 'assessment-explore', 'assessment_accelerator_click'));
    parent.appendChild(box);
  }
  function intro() {
    clear('What would you do next?', false);
    screen.appendChild(el('p', 'Ten real-world decisions across business, data modeling, engineering, governance, and AI. Find your next learning priority.'));
    screen.appendChild(el('p', '10 questions · Around 15 minutes · No signup', 'assessment-meta'));
    screen.appendChild(el('p', 'Get your scorecard, answer explanations, and a practical next step. This is a learning exercise, not a seniority certification.'));
    var row = actions();
    row.appendChild(button(state.submitted ? 'View saved scorecard' : Object.keys(state.answers).length ? 'Resume assessment' : 'Start assessment', function () {
      if (state.submitted) results(); else { track('assessment_start'); question(state.index); }
    }, true));
    if (Object.keys(state.answers).length) row.appendChild(button('Start again', restart));
  }
  function restart() {
    clear('Start a new attempt?');
    screen.appendChild(el('p', 'This replaces the answers and scorecard saved in this browser. Print your current result first if you want to keep it.'));
    var row = actions(); row.appendChild(button('Keep current attempt', function () { state.submitted ? results() : intro(); }));
    row.appendChild(button('Replace and start again', function () { state = fresh(); save(); track('assessment_restart'); question(0); }, true));
  }
  function question(index) {
    state.index = index; save();
    var q = data.questions[index];
    clear(q.title);
    screen.className = 'assessment-question';
    var progress = el('progress'); progress.max = data.questions.length; progress.value = Object.keys(state.answers).length;
    progress.setAttribute('aria-label', 'Questions answered'); screen.appendChild(progress);
    screen.appendChild(el('p', 'Question ' + (index + 1) + ' of ' + data.questions.length + ' · ' + Object.keys(state.answers).length + ' answered', 'assessment-meta'));
    screen.appendChild(el('p', 'Choose the best answer for the situation described. You can change your answer before submitting.', 'assessment-hint'));
    var fieldset = el('fieldset'); var legend = el('legend', q.prompt); fieldset.appendChild(legend);
    q.options.concat([{ id: 'unknown', text: 'I don’t know yet' }]).forEach(function (option) {
      var label = el('label', undefined, 'assessment-option'); var input = el('input');
      input.type = 'radio'; input.name = q.id; input.value = option.id; input.checked = state.answers[q.id] === option.id;
      input.addEventListener('change', function () { state.answers[q.id] = option.id; save(); progress.value = Object.keys(state.answers).length; screen.querySelector('.assessment-meta').textContent = 'Question ' + (index + 1) + ' of ' + data.questions.length + ' · ' + Object.keys(state.answers).length + ' answered'; track('assessment_answer', { question_id: q.id }); });
      label.append(input, el('span', option.text)); fieldset.appendChild(label);
    });
    screen.appendChild(fieldset);
    var row = actions(); if (index) row.appendChild(button('Back', function () { question(index - 1); }));
    row.appendChild(button(index === data.questions.length - 1 ? 'Review answers' : 'Next', function () { index === data.questions.length - 1 ? review() : question(index + 1); }, true));
    if (index !== data.questions.length - 1) row.appendChild(button('Review all', review));
  }
  function review() {
    clear('Review your answers');
    screen.appendChild(el('p', 'You can change any answer before submitting. Choose “I don’t know yet” for any scenario you are unsure about.'));
    var list = el('ol'); var missing = 0;
    data.questions.forEach(function (q, i) {
      var answer = q.options.find(function (o) { return o.id === state.answers[q.id]; });
      var text = answer ? answer.text : state.answers[q.id] === 'unknown' ? 'I don’t know yet' : 'Not answered';
      if (!state.answers[q.id]) missing++;
      var item = el('li'); item.append(el('strong', q.title), el('p', text), button('Edit question ' + (i + 1), function () { question(i); })); list.appendChild(item);
    }); screen.appendChild(list);
    var row = actions(); var submit = button('Get my scorecard', function () { state.submitted = true; save(); track('assessment_complete'); results(); }, true);
    submit.disabled = missing > 0; row.appendChild(submit);
    if (missing) screen.appendChild(el('p', 'Answer the remaining ' + missing + ' question(s) to receive your scorecard.', 'notice--warning'));
  }
  function results() {
    clear('Your analyst scorecard');
    screen.className = 'assessment-results';
    var result = AnalystScorecard.score(data, state.answers);
    screen.appendChild(el('p', result.correct + ' / ' + result.total + ' scenarios answered correctly · ' + result.percent + '%', 'assessment-score'));
    accelerator(screen);
    var breakdown = el('details', undefined, 'assessment-breakdown');
    breakdown.appendChild(el('summary', 'Review your scores and answers'));
    breakdown.appendChild(el('p', 'One point per correct answer. Two questions per dimension offer a snapshot, not a complete measure of proficiency. Version ' + data.version + '.', 'assessment-meta'));
    screen.appendChild(breakdown);
    result.dimensions.forEach(function (d) {
      var row = el('div', undefined, 'assessment-dimension');
      row.appendChild(el('p', data.dimensions.find(function (item) { return item.id === d.id; }).name + ': ' + d.correct + ' / ' + d.total));
      var meter = el('meter'); meter.min = 0; meter.max = d.total; meter.value = d.correct; meter.setAttribute('aria-label', row.textContent); row.appendChild(meter); breakdown.appendChild(row);
    });
    var row = actions(); row.classList.add('assessment-no-print');
    row.appendChild(button('Print / save PDF', function () { track('assessment_print'); window.print(); }));
    row.appendChild(button('Copy sharing summary', async function () {
      var text = 'I completed the DataConscious Senior Data Analyst Scorecard. Try the 10 scenarios: https://data-conscious.com/senior-data-analyst-scorecard/';
      try { await navigator.clipboard.writeText(text); status.textContent = 'Summary copied. Paste it wherever you want to share.'; track('assessment_share_copy'); }
      catch (_) { var area = el('textarea'); area.value = text; area.setAttribute('aria-label', 'Sharing summary — select and copy'); row.appendChild(area); area.focus(); area.select(); status.textContent = 'Automatic copying is unavailable. Copy the selected summary.'; }
    })); row.appendChild(button('Start again', restart));
    breakdown.appendChild(el('h3', 'Answer explanations'));
    data.questions.forEach(function (q, i) {
      var details = el('details', undefined, 'assessment-explanation'); var correct = q.options.find(function (o) { return o.id === q.correct; });
      details.appendChild(el('summary', (i + 1) + '. ' + q.title + ' — ' + (state.answers[q.id] === q.correct ? 'Correct' : 'Review')));
      details.appendChild(el('p', q.prompt));
      var selected = q.options.find(function (o) { return o.id === state.answers[q.id]; });
      details.appendChild(el('p', 'Your answer: ' + (selected ? selected.text : 'I don’t know yet')));
      details.appendChild(el('p', 'Best answer: ' + correct.text));
      q.options.forEach(function (o) { details.appendChild(el('p', o.text + ' — ' + o.reason)); }); breakdown.appendChild(details);
    });
    track('assessment_result_view');
  }
  var printOpen = [];
  window.addEventListener('beforeprint', function () { printOpen = Array.from(screen.querySelectorAll('details')).filter(function (d) { return !d.open; }); printOpen.forEach(function (d) { d.open = true; }); });
  window.addEventListener('afterprint', function () { printOpen.forEach(function (d) { d.open = false; }); });
  intro();
}());
