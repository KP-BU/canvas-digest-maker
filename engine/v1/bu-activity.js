/*! Baylor ILXD Activity Engine v1 — accessible H5P-style activities with SCORM 1.2.
 *  Content lives in <script type="application/json" id="activity-data"> in the page that loads this file.
 *  No network calls; no content ever leaves the page. */
(function () {
  "use strict";
  var VERSION = "1.0.0";

  /* ------------------------------------------------------------------ CSS */
  var CSS = `
:root{--green:#154734;--green-dark:#0d3325;--gold:#FFB81C;--ink:#12352a;--muted:#4f6159;--soft-green:#e7f1ed;--soft-gold:#fff4d8;--line:#cfddd7;--danger:#b42318;--danger-soft:#ffe5e2;--success:#1f7a46;--success-soft:#e2f5e8;--shadow:0 18px 48px rgba(21,71,52,.14)}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:"Proxima Nova","Helvetica Neue",Arial,sans-serif;color:var(--ink);line-height:1.5;font-size:clamp(1rem,.97rem + .15vw,1.075rem);min-height:100vh;display:flex;flex-direction:column;background:radial-gradient(circle at top left,rgba(255,184,28,.22),transparent 30rem),linear-gradient(135deg,#f7fbf8 0%,#eef7f3 100%)}
.bu-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}
.bu-wrap{flex:1 0 auto;width:100%;max-width:48rem;margin:0 auto;padding:clamp(.75rem,2.5vw,1.5rem);display:flex;flex-direction:column;justify-content:center;gap:1rem}
.bu-card{background:rgba(255,255,255,.97);border:2px solid rgba(21,71,52,.1);border-radius:8px;box-shadow:var(--shadow);padding:clamp(1rem,2.5vw,1.5rem)}
.bu-header{border-top:6px solid var(--gold)}
.bu-eyebrow{margin:0 0 .25rem;font-size:.8rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--green)}
h1.bu-title{margin:0 0 .4rem;color:var(--green);font-size:clamp(1.45rem,1.2rem + 1.2vw,2rem);line-height:1.2}
.bu-instructions{margin:0;color:var(--ink)}
h2,h3{color:var(--green);line-height:1.25}
h2{font-size:1.2rem;margin:0 0 .75rem}
h3{font-size:1.05rem;margin:0 0 .5rem}
.bu-meta{display:flex;flex-wrap:wrap;align-items:center;gap:.75rem;margin-top:.85rem}
.bu-progress-text{font-weight:700;color:var(--green);font-size:.95rem;min-width:7rem}
.bu-bar{flex:1 1 10rem;height:.7rem;background:var(--soft-green);border:1px solid var(--line);border-radius:999px;overflow:hidden}
.bu-bar>span{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--green),var(--gold));transition:width .3s ease}
.bu-btn{font:inherit;font-weight:700;min-height:44px;min-width:44px;padding:.55rem 1.1rem;border-radius:8px;border:2px solid var(--green);background:#fff;color:var(--green);cursor:pointer;line-height:1.25;text-align:center;touch-action:manipulation}
.bu-btn:hover:not(:disabled){background:var(--soft-green)}
.bu-btn.primary{background:var(--green);color:#fff}
.bu-btn.primary:hover:not(:disabled){background:var(--green-dark)}
.bu-btn.gold{background:var(--gold);border-color:var(--gold);color:var(--green)}
.bu-btn.gold:hover:not(:disabled){background:var(--green);border-color:var(--green);color:#fff}
.bu-btn:disabled{opacity:.5;cursor:not-allowed}
.bu-btn.small{min-height:44px;padding:.35rem .7rem;font-size:.92rem}
:focus-visible{outline:3px solid var(--green);outline-offset:3px}
.bu-dark :focus-visible,.bu-btn.primary:focus-visible{outline-color:var(--gold)}
.bu-actions{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1rem;align-items:center}
.bu-feedback{margin-top:1rem;padding:.75rem 1rem;border-radius:8px;border:2px solid var(--line);background:var(--soft-green);font-weight:600}
.bu-feedback:empty{display:none}
.bu-feedback.good{background:var(--success-soft);border-color:var(--success);color:#14532d}
.bu-feedback.bad{background:var(--danger-soft);border-color:var(--danger);color:#7a1a12}
.bu-feedback.info{background:var(--soft-gold);border-color:#d99a00;color:var(--ink)}
.bu-mark{font-weight:900;margin-right:.25rem}
.bu-good-text{color:var(--success)}
.bu-bad-text{color:var(--danger)}
.bu-summary h2{font-size:1.35rem}
.bu-summary ul{margin:.25rem 0 1rem;padding-left:1.25rem}
.bu-summary .bu-cols{display:grid;gap:1rem}
.bu-error{border-color:var(--danger);border-top:6px solid var(--danger)}
.bu-error li{margin:.25rem 0}
.bu-finish-bar{position:sticky;bottom:0;z-index:30;padding:.75rem 1rem calc(.75rem + env(safe-area-inset-bottom));background:rgba(247,251,248,.95);border-top:2px solid var(--line)}
.bu-finish{display:block;width:min(100%,22rem);margin:0 auto;min-height:3rem;border:2px solid var(--gold);border-radius:8px;background:var(--gold);color:var(--green);font:inherit;font-weight:900;font-size:1.05rem;cursor:pointer;transition:background .16s ease,color .16s ease,opacity .16s ease}
.bu-finish:disabled{opacity:.5;cursor:not-allowed}
.bu-finish:not(:disabled):hover,.bu-finish:not(:disabled):focus-visible{background:var(--green);border-color:var(--green);color:#fff;outline:3px solid var(--gold);outline-offset:2px}
.bu-finish.ready{animation:bu-pulse 1.2s ease 2}
@keyframes bu-pulse{50%{transform:scale(1.04)}}
.bu-finish-note{text-align:center;font-size:.85rem;color:var(--muted);margin:.35rem 0 0}
.bu-chip{display:inline-flex;align-items:center;gap:.35rem;font:inherit;font-weight:700;min-height:44px;padding:.45rem .8rem;border-radius:8px;border:2px solid #d99a00;background:var(--gold);color:var(--green);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;text-align:left;line-height:1.25}
.bu-chip[aria-pressed="true"]{outline:3px solid var(--green);outline-offset:2px;background:var(--soft-gold)}
.bu-chip.locked{background:var(--success-soft);border-color:var(--success);color:#14532d;cursor:default}
.bu-chip.dragging{opacity:.9;box-shadow:0 12px 28px rgba(0,0,0,.25);cursor:grabbing;position:relative;z-index:50;pointer-events:none}
.bu-drop-over{outline:3px dashed var(--green);outline-offset:3px;background:var(--soft-gold)!important}
.bu-shake{animation:bu-shake .35s ease}
@keyframes bu-shake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.bu-part-hint{font-size:.9rem;color:var(--muted);margin:.25rem 0 0}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
@media (min-width:700px) and (max-width:1099px){.bu-wrap{max-width:62rem}}
@media (min-width:1100px) and (min-height:900px){.bu-wrap{max-width:82.5rem}.bu-summary .bu-cols{grid-template-columns:1fr 1fr}}
`;

  /* ---------------------------------------------------------------- SCORM 1.2 */
  var SCORM = (function () {
    var api = null, initialized = false, finished = false;
    function findApi(win) {
      var cur = win, n = 0;
      try {
        while (cur && !cur.API && cur.parent && cur.parent !== cur && n < 500) { n++; cur = cur.parent; }
        if (cur && cur.API) return cur.API;
        if (win.opener && !win.opener.closed) return findApi(win.opener);
      } catch (e) { return null; }
      return null;
    }
    function call(m) {
      var args = Array.prototype.slice.call(arguments, 1);
      if (!api || typeof api[m] !== "function") return "false";
      try { return api[m].apply(api, args); } catch (e) { return "false"; }
    }
    function init() {
      if (initialized) return true;
      api = findApi(window);
      if (!api) return false;
      initialized = String(call("LMSInitialize", "")) === "true";
      if (initialized) {
        var prior = call("LMSGetValue", "cmi.core.lesson_status");
        if (prior !== "completed" && prior !== "passed") call("LMSSetValue", "cmi.core.lesson_status", "incomplete");
        call("LMSSetValue", "cmi.core.score.min", "0");
        call("LMSSetValue", "cmi.core.score.max", "100");
        call("LMSCommit", "");
      }
      return initialized;
    }
    function setScore(raw) {
      if (!initialized) return;
      call("LMSSetValue", "cmi.core.score.raw", String(raw));
      call("LMSCommit", "");
    }
    function finishActivity(score) {
      if (finished) return;
      if (initialized) {
        call("LMSSetValue", "cmi.core.lesson_status", "completed");
        call("LMSSetValue", "cmi.core.score.raw", String(score == null ? 100 : score));
        call("LMSCommit", "");
        call("LMSFinish", "");
      }
      finished = true;
    }
    function unloadSafety() {
      if (finished || !initialized) return;
      call("LMSCommit", ""); call("LMSFinish", ""); finished = true;
    }
    window.addEventListener("pagehide", unloadSafety);
    window.addEventListener("beforeunload", unloadSafety);
    return { init: init, setScore: setScore, finishActivity: finishActivity, connected: function () { return initialized; } };
  })();

  /* --------------------------------------------------------------- helpers */
  function h(tag, props) {
    var el = document.createElement(tag);
    if (props) for (var k in props) {
      var v = props[k];
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach(function (k) { append(el, k); }); return; }
    el.appendChild(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function norm(s) {
    return String(s == null ? "" : s).normalize("NFKC").toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
      .replace(/\s+/g, " ").trim().replace(/^[\s.,;:!?"']+|[\s.,;:!?"']+$/g, "");
  }
  function str(v) { return typeof v === "string" && v.trim() !== ""; }
  function paragraphs(text) { return String(text).split(/\n\s*\n/).map(function (p) { return p.trim(); }).filter(Boolean); }
  /* Parse "text with *answer* markers" -> [{text}|{blank:"answer"}] per paragraph */
  function parseMarked(text) {
    return paragraphs(text).map(function (p) {
      var out = [], re = /\*([^*]+)\*/g, last = 0, m;
      while ((m = re.exec(p))) { if (m.index > last) out.push({ text: p.slice(last, m.index) }); out.push({ blank: m[1].trim() }); last = re.lastIndex; }
      if (last < p.length) out.push({ text: p.slice(last) });
      return out;
    });
  }
  function mark(ok) { return h("span", { class: "bu-mark " + (ok ? "bu-good-text" : "bu-bad-text"), "aria-hidden": "true" }, ok ? "✓" : "✗"); }

  /* Pointer-drag helper: drag `item` onto any element with [data-drop]; tap/click still fires normally. */
  function makeDraggable(item, opts) {
    var start = null, dragging = false, over = null, suppressClick = false;
    item.addEventListener("pointerdown", function (e) {
      if (e.button !== 0 || (opts.canDrag && !opts.canDrag())) return;
      var ctl = e.target.closest ? e.target.closest("button,input,select,textarea,a,summary") : null;
      if (ctl && ctl !== item) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId };
      try { item.setPointerCapture(e.pointerId); } catch (x) {}
    });
    item.addEventListener("pointermove", function (e) {
      if (!start || e.pointerId !== start.id) return;
      var dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!dragging && Math.hypot(dx, dy) < 8) return;
      if (!dragging) { dragging = true; item.classList.add("dragging"); if (opts.onStart) opts.onStart(); }
      e.preventDefault();
      item.style.transform = "translate(" + dx + "px," + dy + "px)";
      var t = document.elementFromPoint(e.clientX, e.clientY);
      var zone = t && t.closest ? t.closest("[data-drop]") : null;
      if (zone !== over) { if (over) over.classList.remove("bu-drop-over"); over = zone; if (over) over.classList.add("bu-drop-over"); }
    });
    function end(e, cancelled) {
      if (!start) return;
      var wasDragging = dragging;
      start = null; dragging = false;
      item.classList.remove("dragging"); item.style.transform = "";
      if (over) over.classList.remove("bu-drop-over");
      var target = over; over = null;
      if (wasDragging) {
        suppressClick = true; setTimeout(function () { suppressClick = false; }, 0);
        if (!cancelled) opts.onDrop(target, e);
      }
    }
    item.addEventListener("pointerup", function (e) { end(e, false); });
    item.addEventListener("pointercancel", function (e) { end(e, true); });
    item.addEventListener("click", function (e) { if (suppressClick) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
  }

  /* -------------------------------------------------------------- the shell */
  var TYPES = {};
  var CSS_PARTS = [];

  function buildShell(data, typeDef) {
    document.documentElement.lang = data.lang || document.documentElement.lang || "en";
    if (!document.title && data.title) document.title = data.title;
    var progressText = h("span", { class: "bu-progress-text" });
    var barFill = h("span");
    var bar = h("div", { class: "bu-bar", role: "progressbar", "aria-label": "Progress", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": "0" }, barFill);
    var header = h("header", { class: "bu-card bu-header" },
      h("p", { class: "bu-eyebrow" }, data.eyebrow || typeDef.label),
      h("h1", { class: "bu-title" }, data.title || typeDef.label),
      str(data.instructions) ? h("p", { class: "bu-instructions" }, data.instructions) : null,
      h("div", { class: "bu-meta" }, progressText, bar));
    var stage = h("section", { class: "bu-card bu-stage", "aria-label": "Activity" });
    var summary = h("section", { class: "bu-card bu-summary", "aria-labelledby": "bu-summary-h", hidden: true });
    var announcer = h("div", { class: "bu-sr", "aria-live": "polite", "aria-atomic": "true" });
    var main = h("main", { class: "bu-wrap", id: "bu-main" }, header, stage, summary, announcer);
    var finishBtn = h("button", { type: "button", class: "bu-finish", id: "finish-button", disabled: true }, "Finish");
    var finishNote = h("p", { class: "bu-finish-note", id: "bu-finish-note" }, "Finish unlocks when the activity is complete.");
    finishBtn.setAttribute("aria-describedby", "bu-finish-note");
    var footer = h("footer", { class: "bu-finish-bar" }, finishBtn, finishNote);
    var mount = document.getElementById("activity-root") || document.body;
    mount.appendChild(main); mount.appendChild(footer);

    var state = { completed: false, score: null };
    var api = {
      data: data,
      stage: stage,
      h: h,
      announce: function (msg) { announcer.textContent = ""; setTimeout(function () { announcer.textContent = msg; }, 30); },
      progress: function (done, total, noun) {
        var pct = total ? Math.round(done / total * 100) : 0;
        progressText.textContent = done + " of " + total + " " + (noun || "complete");
        barFill.style.width = pct + "%";
        bar.setAttribute("aria-valuenow", String(pct));
        bar.setAttribute("aria-valuetext", progressText.textContent);
      },
      feedbackBox: function () { return h("div", { class: "bu-feedback", "aria-live": "polite", "aria-atomic": "true" }); },
      setFeedback: function (box, tone, msg) {
        box.className = "bu-feedback" + (tone ? " " + tone : "");
        box.textContent = "";
        if (msg == null) return;
        if (tone === "good" || tone === "bad") append(box, mark(tone === "good"));
        append(box, msg);
      },
      /* result: {total, firstTry:[names], retried:[{name,misses}], custom?:Node, headline?:string, score?:number} */
      complete: function (result) {
        if (state.completed) { renderSummary(result, true); return; }
        state.completed = true;
        var total = result.total || 1;
        state.score = result.score != null ? result.score : Math.round((result.firstTry ? result.firstTry.length : total) / total * 100);
        SCORM.setScore(state.score);
        renderSummary(result, false);
        finishBtn.disabled = false;
        finishBtn.classList.add("ready");
        finishNote.textContent = "Activity complete. Select Finish to record your completion.";
        api.announce("Activity complete — the Finish button is now available.");
      },
      restart: null
    };

    function renderSummary(r, isReplay) {
      summary.textContent = "";
      var headline = r.headline;
      if (!headline) {
        var ft = r.firstTry ? r.firstTry.length : 0, total = r.total || 0;
        headline = ft === total ? "Perfect first pass — all " + total + " correct on the first try."
          : "You got " + ft + " of " + total + " right on the first try, then worked the rest through to the correct answer.";
      }
      append(summary, h("h2", { id: "bu-summary-h", tabindex: "-1" }, isReplay ? "Practice round complete" : "Activity complete"));
      append(summary, h("p", null, headline));
      if (r.custom) append(summary, r.custom);
      var cols = h("div", { class: "bu-cols" });
      if (r.retried && r.retried.length) {
        append(cols, h("div", null, h("h3", null, "Worth another look"),
          h("ul", null, r.retried.map(function (x) { return h("li", null, x.name + (x.misses > 1 ? " (missed " + x.misses + " times)" : " (missed once)")); }))));
      }
      if (r.firstTry && r.firstTry.length && r.retried && r.retried.length) {
        append(cols, h("div", null, h("h3", null, "Got it first try"), h("ul", null, r.firstTry.map(function (n) { return h("li", null, n); }))));
      }
      if (cols.childNodes.length) append(summary, cols);
      if (!isReplay && state.score != null && !SCORM.connected()) append(summary, h("p", { class: "bu-part-hint" }, "Preview mode: no LMS connection, so nothing is recorded. Score that would be reported: " + state.score + "%."));
      if (isReplay) append(summary, h("p", { class: "bu-part-hint" }, "Your recorded score is from your first completion and does not change."));
      append(summary, h("div", { class: "bu-actions" }, h("button", { type: "button", class: "bu-btn", onclick: function () { api.restart && api.restart(); } }, "Practice again")));
      summary.hidden = false;
      setTimeout(function () { var hd = document.getElementById("bu-summary-h"); if (hd) hd.focus(); }, 60);
    }

    finishBtn.addEventListener("click", function () {
      if (!state.completed) return;
      SCORM.finishActivity(state.score == null ? 100 : state.score);
      finishBtn.textContent = "✓ Completed — you may close this window";
      finishBtn.disabled = true;
      finishBtn.classList.remove("ready");
      finishNote.textContent = SCORM.connected() ? "Your completion has been recorded." : "Preview mode: completion would be recorded in the LMS.";
      api.announce("Completion recorded. You may close this window.");
    });

    api.hideSummary = function () { summary.hidden = true; summary.textContent = ""; };
    return api;
  }

  function showErrors(errors, data) {
    var box = h("main", { class: "bu-wrap" }, h("section", { class: "bu-card bu-error", role: "alert" },
      h("h1", { class: "bu-title" }, "This activity could not be built"),
      h("p", null, "The activity content has problems that need fixing (ask the Copilot agent to correct them and rebuild):"),
      h("ul", null, errors.map(function (e) { return h("li", null, e); }))));
    (document.getElementById("activity-root") || document.body).appendChild(box);
    if (window.console) console.error("[BU Activity] invalid content", errors, data);
  }

  function validate(data) {
    var errs = [];
    if (!data || typeof data !== "object") return ["Content is not a JSON object."];
    if (!TYPES[data.type]) errs.push('Unknown "type": ' + JSON.stringify(data.type) + ". Use one of: " + Object.keys(TYPES).join(", ") + ".");
    if (!str(data.title)) errs.push('Missing "title".');
    if (TYPES[data.type] && TYPES[data.type].validate) errs = errs.concat(TYPES[data.type].validate(data) || []);
    return errs;
  }

  function render(data) {
    var errs = validate(data);
    if (errs.length) { showErrors(errs, data); return null; }
    var def = TYPES[data.type];
    var api = buildShell(data, def);
    SCORM.init();
    api.restart = function () { api.hideSummary(); api.stage.textContent = ""; def.render(api, data, true); };
    def.render(api, data, false);
    return api;
  }

  function boot() {
    if (!document.head.querySelector("style[data-bu-activity]")) document.head.appendChild(h("style", { "data-bu-activity": VERSION }, CSS + CSS_PARTS.join("\n")));
    var node = document.getElementById("activity-data");
    if (!node) { showErrors(['No <script id="activity-data" type="application/json"> block found in the page.']); return; }
    var data;
    try { data = JSON.parse(node.textContent); } catch (e) { showErrors(["The activity content is not valid JSON: " + e.message]); return; }
    var fb = document.getElementById("bu-loading"); if (fb) fb.remove();
    render(data);
  }

  window.BUActivity = { version: VERSION, types: TYPES, validate: validate, render: render, _h: h };
  var U = { h: h, append: append, shuffle: shuffle, norm: norm, str: str, paragraphs: paragraphs, parseMarked: parseMarked, mark: mark, makeDraggable: makeDraggable };

  /* ============================================================ QUIZ (Question Set) */
  TYPES.quiz = {
    label: "Question Set",
    validate: function (d) {
      var e = [];
      if (!Array.isArray(d.questions) || !d.questions.length) return ['quiz needs a non-empty "questions" array.'];
      d.questions.forEach(function (q, i) {
        var n = "Question " + (i + 1);
        if (!U.str(q.q)) e.push(n + ': missing "q" (question text).');
        if (!Array.isArray(q.options) || q.options.length < 2) e.push(n + ': needs at least 2 "options".');
        else {
          if (!q.options.some(function (o) { return o && o.correct === true; })) e.push(n + ': no option has "correct": true.');
          q.options.forEach(function (o, j) { if (!o || !U.str(o.text)) e.push(n + ", option " + (j + 1) + ': missing "text".'); });
        }
      });
      return e;
    },
    render: function (api, d) {
      var h = U.h, qs = d.questions, idx = 0, misses = qs.map(function () { return 0; }), done = 0;
      var order = d.shuffleQuestions ? U.shuffle(qs.map(function (_, i) { return i; })) : qs.map(function (_, i) { return i; });
      api.progress(0, qs.length, "questions answered");
      function show() {
        var qi = order[idx], q = qs[qi];
        var multi = q.options.filter(function (o) { return o.correct; }).length > 1;
        var opts = q.shuffleOptions === false || d.shuffleOptions === false ? q.options.slice() : U.shuffle(q.options);
        api.stage.textContent = "";
        var name = "q" + qi;
        var heading = h("h2", { id: "bu-q-h", tabindex: "-1" }, "Question " + (idx + 1) + " of " + qs.length);
        var legend = h("legend", { class: "bu-q-text" }, q.q);
        var inputs = [];
        var list = h("div", { class: "bu-options" }, opts.map(function (o, j) {
          var id = name + "-o" + j;
          var inp = h("input", { type: multi ? "checkbox" : "radio", name: name, id: id });
          inp._opt = o; inputs.push(inp);
          var fb = h("span", { class: "bu-opt-fb" });
          inp._fb = fb;
          return h("div", { class: "bu-option" }, inp, h("label", { for: id }, o.text), fb);
        }));
        var fs = h("fieldset", { class: "bu-fieldset" }, legend, multi ? h("p", { class: "bu-part-hint" }, "Select all that apply.") : null, list);
        var feedback = api.feedbackBox();
        var check = h("button", { type: "button", class: "bu-btn primary" }, "Check");
        var next = h("button", { type: "button", class: "bu-btn gold", hidden: true }, idx === qs.length - 1 ? "See results" : "Next question");
        inputs.forEach(function (i) { i.addEventListener("change", function () { inputs.forEach(function (x) { x.parentNode.classList.remove("is-wrong"); x._fb.textContent = ""; }); }); });
        check.addEventListener("click", function () {
          var chosen = inputs.filter(function (i) { return i.checked; });
          if (!chosen.length) { api.setFeedback(feedback, "info", "Choose an answer first."); return; }
          var ok = inputs.every(function (i) { return i.checked === !!i._opt.correct; });
          inputs.forEach(function (i) { i._fb.textContent = ""; i.parentNode.classList.remove("is-wrong", "is-right"); });
          chosen.forEach(function (i) {
            i.parentNode.classList.add(i._opt.correct ? "is-right" : "is-wrong");
            i._fb.appendChild(U.mark(!!i._opt.correct));
            i._fb.appendChild(document.createTextNode((i._opt.correct ? "Correct" : "Incorrect") + (U.str(i._opt.feedback) ? ": " + i._opt.feedback : "")));
          });
          if (ok) {
            inputs.forEach(function (i) { i.disabled = true; });
            check.hidden = true; next.hidden = false;
            done++; api.progress(done, qs.length, "questions answered");
            api.setFeedback(feedback, "good", "Correct!" + (U.str(q.explanation) ? " " + q.explanation : ""));
            next.focus();
          } else {
            misses[qi]++;
            api.setFeedback(feedback, "bad", multi ? "Not quite — check which options you selected and try again." : "Not quite — try again.");
          }
        });
        next.addEventListener("click", function () {
          idx++;
          if (idx < qs.length) { show(); document.getElementById("bu-q-h").focus(); return; }
          finish();
        });
        U.append(api.stage, [heading, fs, h("div", { class: "bu-actions" }, check, next), feedback]);
      }
      function finish() {
        api.stage.textContent = "";
        U.append(api.stage, h("p", null, "All questions answered. Your results are below."));
        var label = function (i) { var t = qs[i].q; return t.length > 90 ? t.slice(0, 87) + "…" : t; };
        api.complete({
          total: qs.length,
          firstTry: order.filter(function (i) { return !misses[i]; }).map(label),
          retried: order.filter(function (i) { return misses[i]; }).map(function (i) { return { name: label(i), misses: misses[i] }; })
        });
      }
      show();
    }
  };
  CSS_PARTS.push(
    ".bu-fieldset{border:0;margin:0;padding:0;min-width:0}.bu-q-text{font-size:1.1rem;font-weight:700;margin-bottom:.75rem;padding:0;color:var(--ink)}" +
    ".bu-options{display:grid;gap:.5rem}.bu-option{display:grid;grid-template-columns:auto 1fr;gap:.25rem .65rem;align-items:start;padding:.65rem .8rem;border:2px solid var(--line);border-radius:8px;background:#fff}" +
    ".bu-option input{width:1.3rem;height:1.3rem;margin:.15rem 0 0;accent-color:var(--green)}.bu-option label{cursor:pointer}" +
    ".bu-option.is-right{border-color:var(--success);background:var(--success-soft)}.bu-option.is-wrong{border-color:var(--danger);background:var(--danger-soft)}" +
    ".bu-opt-fb{grid-column:2;font-size:.95rem;font-weight:600}.bu-opt-fb:empty{display:none}");

  /* ============================================================ DRAG AND DROP (categorize) */
  TYPES.dragdrop = {
    label: "Drag and Drop",
    validate: function (d) {
      var e = [];
      if (!Array.isArray(d.categories) || d.categories.length < 2) e.push('dragdrop needs a "categories" array with at least 2 entries.');
      if (!Array.isArray(d.items) || d.items.length < 2) e.push('dragdrop needs an "items" array with at least 2 entries.');
      if (e.length) return e;
      var ids = {};
      d.categories.forEach(function (c, i) {
        if (!c || !U.str(c.id) || !U.str(c.label)) e.push("Category " + (i + 1) + ': needs "id" and "label".'); else ids[c.id] = 1;
      });
      d.items.forEach(function (it, i) {
        var cats = it && (Array.isArray(it.category) ? it.category : [it.category]);
        if (!it || !U.str(it.text)) e.push("Item " + (i + 1) + ': missing "text".');
        else if (!cats.length || cats.some(function (c) { return !ids[c]; })) e.push('Item "' + it.text + '": "category" must be a category id (or a list of ids).');
      });
      return e;
    },
    render: function (api, d) {
      var h = U.h;
      var items = d.items.map(function (it, i) {
        return { i: i, text: it.text, cats: Array.isArray(it.category) ? it.category : [it.category], misses: 0, locked: false, el: null };
      });
      var selected = null;
      api.progress(0, items.length, "sorted correctly");
      var trayList = h("div", { class: "bu-dd-list", role: "list" });
      var trayPlace = h("button", { type: "button", class: "bu-btn small", disabled: true }, "Return selected item here");
      var tray = h("section", { class: "bu-dd-tray", "data-drop": "tray", "aria-labelledby": "bu-tray-h" },
        h("h2", { id: "bu-tray-h" }, "Items to sort"), trayList, trayPlace);
      var bins = d.categories.map(function (c) {
        var list = h("div", { class: "bu-dd-list", role: "list" });
        var place = h("button", { type: "button", class: "bu-btn small primary", disabled: true, "aria-label": "Place selected item in " + c.label }, "Place here");
        var hid = "bu-bin-" + c.id.replace(/[^\w-]/g, "_");
        var sec = h("section", { class: "bu-dd-bin", "data-drop": c.id, "aria-labelledby": hid }, h("h2", { id: hid }, c.label), list, place);
        place.addEventListener("click", function () { if (selected) placeInto(selected, c.id); });
        return { id: c.id, label: c.label, list: list, place: place, sec: sec };
      });
      trayPlace.addEventListener("click", function () { if (selected) placeInto(selected, "tray"); });
      var feedback = api.feedbackBox();
      var check = h("button", { type: "button", class: "bu-btn primary" }, "Check answers");
      var hint = h("p", { class: "bu-part-hint" }, "Drag an item into a category, or select an item and then choose “Place here” under a category.");

      function listFor(id) { return id === "tray" ? trayList : bins.filter(function (b) { return b.id === id; })[0].list; }
      function where(it) { var z = it.el.closest("[data-drop]"); return z ? z.getAttribute("data-drop") : "tray"; }
      function select(it) {
        if (it.locked) return;
        if (selected === it) { selected = null; } else selected = it;
        items.forEach(function (x) { if (x.el.tagName === "BUTTON") x.el.setAttribute("aria-pressed", String(x === selected)); });
        var on = !!selected;
        bins.forEach(function (b) { b.place.disabled = !on; });
        trayPlace.disabled = !on || where(selected) === "tray";
        if (on) api.announce(selected.text + " selected. Choose Place here under a category.");
      }
      function placeInto(it, zoneId) {
        if (it.locked) return;
        var li = it.el.parentNode;
        listFor(zoneId).appendChild(li);
        it.el.classList.remove("bu-shake");
        selected = null;
        items.forEach(function (x) { if (x.el.tagName === "BUTTON") x.el.setAttribute("aria-pressed", "false"); });
        bins.forEach(function (b) { b.place.disabled = true; }); trayPlace.disabled = true;
        var label = zoneId === "tray" ? "the items to sort" : bins.filter(function (b) { return b.id === zoneId; })[0].label;
        api.announce(it.text + " placed in " + label + ".");
        it.el.focus();
      }
      items = U.shuffle(items);
      items.forEach(function (it) {
        var btn = h("button", { type: "button", class: "bu-chip", "aria-pressed": "false" }, it.text);
        it.el = btn;
        btn.addEventListener("click", function () { select(it); });
        U.makeDraggable(btn, {
          canDrag: function () { return !it.locked; },
          onDrop: function (zone) { if (zone) placeInto(it, zone.getAttribute("data-drop")); }
        });
        trayList.appendChild(h("div", { role: "listitem" }, btn));
      });
      check.addEventListener("click", function () {
        var right = 0, wrong = 0, unplaced = 0;
        items.forEach(function (it) {
          if (it.locked) { right++; return; }
          var z = where(it);
          if (z === "tray") { unplaced++; return; }
          if (it.cats.indexOf(z) >= 0) {
            it.locked = true; right++;
            var chip = h("span", { class: "bu-chip locked" }, U.mark(true), it.text, h("span", { class: "bu-sr" }, " (correct)"));
            it.el.parentNode.replaceChild(chip, it.el); it.el = chip;
          } else {
            wrong++; it.misses++;
            trayList.appendChild(it.el.parentNode);
            it.el.classList.remove("bu-shake"); void it.el.offsetWidth; it.el.classList.add("bu-shake");
          }
        });
        selected = null; bins.forEach(function (b) { b.place.disabled = true; }); trayPlace.disabled = true;
        items.forEach(function (x) { if (x.el.tagName === "BUTTON") x.el.setAttribute("aria-pressed", "false"); });
        api.progress(right, items.length, "sorted correctly");
        if (right === items.length) {
          api.setFeedback(feedback, "good", "All " + items.length + " items are sorted correctly.");
          check.disabled = true;
          var ordered = items.slice().sort(function (a, b) { return a.i - b.i; });
          api.complete({
            total: items.length,
            firstTry: ordered.filter(function (x) { return !x.misses; }).map(function (x) { return x.text; }),
            retried: ordered.filter(function (x) { return x.misses; }).map(function (x) { return { name: x.text, misses: x.misses }; })
          });
        } else {
          var parts = [right + " of " + items.length + " correct."];
          if (wrong) parts.push(wrong + (wrong === 1 ? " item was" : " items were") + " in the wrong category and went back to Items to sort.");
          if (unplaced) parts.push(unplaced + (unplaced === 1 ? " item has" : " items have") + " not been placed yet.");
          api.setFeedback(feedback, wrong ? "bad" : "info", parts.join(" "));
        }
      });
      var binsWrap = h("div", { class: "bu-dd-bins", style: "--bins:" + Math.min(bins.length, 4) }, bins.map(function (b) { return b.sec; }));
      U.append(api.stage, [hint, h("div", { class: "bu-dd-layout" }, tray, binsWrap), h("div", { class: "bu-actions" }, check), feedback]);
    }
  };
  CSS_PARTS.push(
    ".bu-dd-layout{display:grid;gap:1rem;margin-top:.75rem}.bu-dd-bins{display:grid;gap:.75rem}" +
    ".bu-dd-tray,.bu-dd-bin{border:2px dashed var(--line);border-radius:8px;padding:.75rem;background:#fbfdfc;display:flex;flex-direction:column;gap:.6rem;min-height:8rem}" +
    ".bu-dd-bin{border-style:solid;border-color:var(--green);background:var(--soft-green)}" +
    ".bu-dd-tray h2,.bu-dd-bin h2{font-size:1.05rem;margin:0}.bu-dd-list{display:flex;flex-wrap:wrap;gap:.5rem;align-content:flex-start;flex:1}" +
    ".bu-dd-list>div{display:flex}.bu-dd-bin .bu-btn,.bu-dd-tray .bu-btn{align-self:flex-start}" +
    "@media (min-width:640px){.bu-dd-bins{grid-template-columns:repeat(2,1fr)}}" +
    "@media (min-width:1100px) and (min-height:900px){.bu-dd-layout{grid-template-columns:minmax(16rem,1fr) 2.2fr}.bu-dd-bins{grid-template-columns:repeat(var(--bins),1fr)}}");

  /* ============================================================ DRAG THE WORDS */
  function blanksOf(text) { var n = []; U.parseMarked(text).forEach(function (p) { p.forEach(function (s) { if (s.blank != null) n.push(s.blank); }); }); return n; }

  TYPES.dragwords = {
    label: "Drag the Words",
    validate: function (d) {
      if (!U.str(d.text)) return ['dragwords needs "text" with answers wrapped in *asterisks*.'];
      var b = blanksOf(d.text);
      if (b.length < 2) return ["dragwords text needs at least 2 *answer* blanks (found " + b.length + ")."];
      if (b.some(function (x) { return x.indexOf("|") >= 0; })) return ["dragwords blanks take one answer each — remove the | options (those are for dropdown)."];
      if (d.distractors != null && !Array.isArray(d.distractors)) return ['"distractors" must be a list of words.'];
      return [];
    },
    render: function (api, d) {
      var h = U.h, blanks = [], tiles = [], selected = null;
      var bank = h("div", { class: "bu-dw-bank", "data-drop": "bank", role: "list", "aria-label": "Word bank" });
      var feedback = api.feedbackBox();
      var paras = U.parseMarked(d.text).map(function (segs) {
        return h("p", { class: "bu-dw-p" }, segs.map(function (s) {
          if (s.text != null) return s.text;
          var b = { n: blanks.length + 1, answer: s.blank, tile: null, locked: false, misses: 0 };
          b.el = h("button", { type: "button", class: "bu-blank", "data-drop": "blank-" + b.n });
          b.el._blank = b;
          b.el.addEventListener("click", function () { clickBlank(b); });
          blanks.push(b); setLabel(b);
          return b.el;
        }));
      });
      var longest = blanks.reduce(function (m, b) { return Math.max(m, b.answer.length); }, 4);
      var words = blanks.map(function (b) { return b.answer; }).concat((d.distractors || []).filter(U.str));
      U.shuffle(words).forEach(function (w, i) {
        var t = { word: w, el: h("button", { type: "button", class: "bu-chip", "aria-pressed": "false" }, w), blank: null };
        t.el.addEventListener("click", function () { selectTile(t); });
        U.makeDraggable(t.el, { onDrop: function (zone) {
          if (!zone) return;
          var id = zone.getAttribute("data-drop");
          if (id === "bank") toBank(t, true); else { var b = blanks[+id.split("-")[1] - 1]; if (b && !b.locked) put(t, b); }
        } });
        tiles.push(t);
        bank.appendChild(h("div", { role: "listitem" }, t.el));
      });
      function setLabel(b) {
        b.el.textContent = "";
        if (b.tile) U.append(b.el, b.tile.word); else U.append(b.el, h("span", { "aria-hidden": "true" }, " "));
        b.el.setAttribute("aria-label", "Blank " + b.n + " of " + blanks.length + ", " + (b.tile ? "contains " + b.tile.word : "empty"));
      }
      function clearSel() { selected = null; tiles.forEach(function (t) { t.el.setAttribute("aria-pressed", "false"); }); }
      function selectTile(t) {
        var was = selected === t; clearSel();
        if (!was) { selected = t; t.el.setAttribute("aria-pressed", "true"); api.announce(t.word + " selected. Now choose a blank."); }
      }
      function toBank(t, announce) {
        if (t.blank) { var b = t.blank; t.blank = null; b.tile = null; b.el.classList.remove("is-wrong"); setLabel(b); }
        if (!(t.el.parentNode && t.el.parentNode.parentNode === bank)) bank.appendChild(h("div", { role: "listitem" }, t.el));
        if (announce) api.announce(t.word + " returned to the word bank.");
      }
      function put(t, b) {
        if (b.tile && b.tile !== t) toBank(b.tile, false);
        if (t.blank && t.blank !== b) { var old = t.blank; old.tile = null; setLabel(old); }
        var holder = t.el.parentNode; if (holder && holder.parentNode === bank) holder.remove();
        t.blank = b; b.tile = t; b.el.classList.remove("is-wrong"); setLabel(b);
        clearSel();
        api.announce(t.word + " placed in blank " + b.n + ".");
      }
      function clickBlank(b) {
        if (b.locked) return;
        if (selected) { put(selected, b); b.el.focus(); return; }
        if (b.tile) { var t = b.tile; toBank(t, true); b.el.focus(); return; }
        api.announce("Select a word from the word bank first.");
      }
      var check = h("button", { type: "button", class: "bu-btn primary" }, "Check answers");
      check.addEventListener("click", function () {
        var right = 0, wrong = 0, empty = 0;
        blanks.forEach(function (b) {
          if (b.locked) { right++; return; }
          if (!b.tile) { empty++; return; }
          if (U.norm(b.tile.word) === U.norm(b.answer)) {
            b.locked = true; right++;
            var t = b.tile;
            var span = h("span", { class: "bu-blank locked" }, U.mark(true), t.word, h("span", { class: "bu-sr" }, " (correct, blank " + b.n + ")"));
            b.el.parentNode.replaceChild(span, b.el); b.el = span;
            t.el.remove();
          } else {
            wrong++; b.misses++;
            var tt = b.tile; toBank(tt, false);
            tt.el.classList.remove("bu-shake"); void tt.el.offsetWidth; tt.el.classList.add("bu-shake");
          }
        });
        clearSel();
        api.progress(right, blanks.length, "blanks correct");
        if (right === blanks.length) {
          check.disabled = true;
          api.setFeedback(feedback, "good", "Every blank is correct.");
          api.complete({
            total: blanks.length,
            firstTry: blanks.filter(function (b) { return !b.misses; }).map(function (b) { return b.answer; }),
            retried: blanks.filter(function (b) { return b.misses; }).map(function (b) { return { name: b.answer, misses: b.misses }; })
          });
        } else {
          var msg = right + " of " + blanks.length + " correct.";
          if (wrong) msg += " " + wrong + (wrong === 1 ? " word went" : " words went") + " back to the word bank.";
          if (empty) msg += " " + empty + (empty === 1 ? " blank is" : " blanks are") + " still empty.";
          api.setFeedback(feedback, wrong ? "bad" : "info", msg);
        }
      });
      api.progress(0, blanks.length, "blanks correct");
      var passage = h("div", { class: "bu-dw-text", style: "--blank-w:" + Math.min(longest + 2, 22) + "ch" }, paras);
      U.append(api.stage, [
        h("p", { class: "bu-part-hint" }, "Drag a word into a blank, or select a word and then select a blank. Select a filled blank to send its word back."),
        h("div", { class: "bu-dw-layout" }, h("div", null, h("h2", null, "Passage"), passage), h("div", null, h("h2", null, "Word bank"), bank)),
        h("div", { class: "bu-actions" }, check), feedback]);
    }
  };

  /* ============================================================ DROPDOWN (cloze select) */
  TYPES.dropdown = {
    label: "Dropdown",
    validate: function (d) {
      if (!U.str(d.text)) return ['dropdown needs "text" with blanks written as *correct|wrong|wrong*.'];
      var b = blanksOf(d.text);
      if (b.length < 1) return ["dropdown text needs at least 1 *blank*."];
      var pool = b.map(function (x) { return x.split("|")[0]; }).concat(d.distractors || []);
      var e = [];
      b.forEach(function (x, i) {
        var opts = x.split("|").map(function (s) { return s.trim(); }).filter(Boolean);
        if (!opts.length) e.push("Blank " + (i + 1) + " is empty.");
        if (opts.length === 1 && pool.filter(U.str).length < 2) e.push("Blank " + (i + 1) + ' has no wrong options — write it as *correct|wrong|wrong* or add "distractors".');
      });
      return e;
    },
    render: function (api, d) {
      var h = U.h, blanks = [];
      var raw = blanksOf(d.text);
      var sharedPool = raw.map(function (x) { return x.split("|")[0].trim(); }).concat((d.distractors || []).filter(U.str));
      var feedback = api.feedbackBox();
      var paras = U.parseMarked(d.text).map(function (segs) {
        return h("p", { class: "bu-dw-p" }, segs.map(function (s) {
          if (s.text != null) return s.text;
          var opts = s.blank.split("|").map(function (x) { return x.trim(); }).filter(Boolean);
          var correct = opts[0];
          var choices = opts.length > 1 ? opts : sharedPool.filter(function (w, i, a) { return a.indexOf(w) === i; });
          var n = blanks.length + 1;
          var sel = h("select", { class: "bu-select", "aria-label": "Blank " + n + " of " + raw.length },
            h("option", { value: "" }, "Choose…"), U.shuffle(choices).map(function (c) { return h("option", { value: c }, c); }));
          var st = h("span", { class: "bu-sel-state" });
          var b = { n: n, answer: correct, sel: sel, st: st, locked: false, misses: 0 };
          sel.addEventListener("change", function () { sel.removeAttribute("aria-invalid"); sel.classList.remove("is-wrong"); st.textContent = ""; });
          blanks.push(b);
          return h("span", { class: "bu-sel-wrap" }, sel, st);
        }));
      });
      var check = h("button", { type: "button", class: "bu-btn primary" }, "Check answers");
      check.addEventListener("click", function () {
        var right = 0, wrong = 0, empty = 0;
        blanks.forEach(function (b) {
          if (b.locked) { right++; return; }
          b.st.textContent = "";
          if (!b.sel.value) { empty++; return; }
          if (U.norm(b.sel.value) === U.norm(b.answer)) {
            b.locked = true; right++;
            var span = h("span", { class: "bu-blank locked" }, U.mark(true), b.answer, h("span", { class: "bu-sr" }, " (correct, blank " + b.n + ")"));
            b.sel.parentNode.replaceWith(span);
          } else {
            wrong++; b.misses++;
            b.sel.setAttribute("aria-invalid", "true"); b.sel.classList.add("is-wrong");
            U.append(b.st, [U.mark(false), h("span", { class: "bu-sr" }, "incorrect")]);
          }
        });
        api.progress(right, blanks.length, "blanks correct");
        if (right === blanks.length) {
          check.disabled = true;
          api.setFeedback(feedback, "good", "Every answer is correct.");
          api.complete({
            total: blanks.length,
            firstTry: blanks.filter(function (b) { return !b.misses; }).map(function (b) { return b.answer; }),
            retried: blanks.filter(function (b) { return b.misses; }).map(function (b) { return { name: b.answer, misses: b.misses }; })
          });
        } else {
          var msg = right + " of " + blanks.length + " correct.";
          if (wrong) msg += " " + wrong + (wrong === 1 ? " answer is" : " answers are") + " marked ✗ — change and check again.";
          if (empty) msg += " " + empty + " still unanswered.";
          api.setFeedback(feedback, wrong ? "bad" : "info", msg);
          var firstBad = blanks.filter(function (b) { return !b.locked && b.sel.classList.contains("is-wrong"); })[0];
          if (firstBad) firstBad.sel.focus();
        }
      });
      api.progress(0, blanks.length, "blanks correct");
      U.append(api.stage, [h("div", { class: "bu-dw-text bu-dd-text" }, paras), h("div", { class: "bu-actions" }, check), feedback]);
    }
  };

  /* ============================================================ MARK THE WORDS */
  TYPES.markwords = {
    label: "Mark the Words",
    validate: function (d) {
      if (!U.str(d.text)) return ['markwords needs "text" with the words to find wrapped in *asterisks*.'];
      if (blanksOf(d.text).length < 1) return ["markwords text needs at least 1 *marked* word."];
      return [];
    },
    render: function (api, d) {
      var h = U.h, words = [], wrongPicks = 0, checks = 0, pendingWrong = false;
      var WORD = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;
      var feedback = api.feedbackBox();
      var paras = U.parseMarked(d.text).map(function (segs) {
        return h("p", { class: "bu-mw-p" }, segs.map(function (s) {
          var txt = s.text != null ? s.text : s.blank, target = s.blank != null, out = [], last = 0, m;
          WORD.lastIndex = 0;
          while ((m = WORD.exec(txt))) {
            if (m.index > last) out.push(txt.slice(last, m.index));
            var w = { text: m[0], target: target, found: false, firstCheck: null };
            w.el = h("button", { type: "button", class: "bu-word", "aria-pressed": "false" }, m[0]);
            w.el.addEventListener("click", function (ww) { return function () { toggle(ww); }; }(w));
            words.push(w); out.push(w.el);
            last = WORD.lastIndex;
          }
          if (last < txt.length) out.push(txt.slice(last));
          return out;
        }));
      });
      var targets = words.filter(function (w) { return w.target; });
      function clearWrong() {
        if (!pendingWrong) return; pendingWrong = false;
        words.forEach(function (w) { if (w.el.classList.contains("is-wrong")) { w.el.classList.remove("is-wrong"); w.el.setAttribute("aria-pressed", "false"); w.el.textContent = w.text; } });
      }
      function toggle(w) {
        if (w.found) return;
        clearWrong();
        var on = w.el.getAttribute("aria-pressed") !== "true";
        w.el.setAttribute("aria-pressed", String(on));
      }
      var check = h("button", { type: "button", class: "bu-btn primary" }, "Check answers");
      check.addEventListener("click", function () {
        clearWrong(); checks++;
        var newly = 0, wrong = 0;
        words.forEach(function (w) {
          if (w.found || w.el.getAttribute("aria-pressed") !== "true") return;
          if (w.target) {
            w.found = true; newly++; if (w.firstCheck == null) w.firstCheck = checks;
            var span = h("span", { class: "bu-word locked" }, U.mark(true), w.text, h("span", { class: "bu-sr" }, " (correct)"));
            w.el.replaceWith(span); w.el = span;
          } else {
            wrong++; wrongPicks++;
            w.el.classList.add("is-wrong");
            U.append(w.el, h("span", { class: "bu-sr" }, " (incorrect)"));
          }
        });
        if (wrong) pendingWrong = true;
        var found = targets.filter(function (w) { return w.found; }).length;
        api.progress(found, targets.length, "found");
        if (found === targets.length && !wrong) {
          check.disabled = true;
          api.setFeedback(feedback, "good", "You found all " + targets.length + ".");
          var first = targets.filter(function (w) { return w.firstCheck === 1; }).map(function (w) { return w.text; });
          var later = targets.filter(function (w) { return w.firstCheck > 1; }).map(function (w) { return { name: w.text, misses: w.firstCheck - 1 }; });
          api.complete({
            total: targets.length, firstTry: first, retried: later,
            headline: (first.length === targets.length && !wrongPicks ? "Perfect first pass — you found all " + targets.length + " on your first check with no wrong picks."
              : "You found " + first.length + " of " + targets.length + " on your first check" + (wrongPicks ? " and made " + wrongPicks + " incorrect " + (wrongPicks === 1 ? "pick" : "picks") + " along the way" : "") + ", then finished the rest.")
          });
        } else {
          var msg = found + " of " + targets.length + " found.";
          if (wrong) msg += " " + wrong + (wrong === 1 ? " selection was" : " selections were") + " incorrect (marked ✗); they clear when you select another word.";
          else if (!newly) msg += " Select the words you think belong, then check again.";
          api.setFeedback(feedback, wrong ? "bad" : "info", msg);
        }
      });
      api.progress(0, targets.length, "found");
      U.append(api.stage, [h("p", { class: "bu-part-hint" }, "Select each word that fits the instructions, then choose Check answers. There are " + targets.length + " to find."),
        h("div", { class: "bu-mw-text" }, paras), h("div", { class: "bu-actions" }, check), feedback]);
    }
  };
  CSS_PARTS.push(
    ".bu-dw-layout{display:grid;gap:1rem;margin-top:.5rem}.bu-dw-text{font-size:1.08rem;line-height:2.6}.bu-dw-p{margin:0 0 .75rem}" +
    ".bu-blank{font:inherit;font-weight:700;display:inline-flex;align-items:center;justify-content:center;min-width:var(--blank-w,8ch);min-height:44px;vertical-align:middle;margin:.1rem .15rem;padding:.2rem .6rem;border:2px dashed var(--green);border-radius:8px;background:#fff;color:var(--green);cursor:pointer;line-height:1.2}" +
    ".bu-blank.locked{border-style:solid;border-color:var(--success);background:var(--success-soft);color:#14532d;cursor:default}" +
    ".bu-dw-bank{display:flex;flex-wrap:wrap;gap:.5rem;padding:.75rem;border:2px dashed var(--line);border-radius:8px;min-height:4rem;background:#fbfdfc}.bu-dw-bank>div{display:flex}" +
    ".bu-dd-text{line-height:2.4}.bu-sel-wrap{display:inline-flex;align-items:center;gap:.2rem;vertical-align:middle}" +
    ".bu-select{font:inherit;min-height:3.1rem;padding:.3rem .5rem;border:2px dashed var(--green);border-radius:8px;background:#fff;color:var(--ink);max-width:100%}" +
    ".bu-select.is-wrong{border-style:solid;border-color:var(--danger);background:var(--danger-soft)}" +
    ".bu-mw-text{font-size:1.08rem;line-height:2.3}.bu-mw-p{margin:0 0 .75rem}" +
    ".bu-word{font:inherit;min-height:44px;padding:.1rem .2rem;margin:0 -.05rem;border:2px solid transparent;border-radius:6px;background:transparent;color:var(--ink);cursor:pointer;vertical-align:baseline}" +
    ".bu-word:hover{background:var(--soft-green)}.bu-word[aria-pressed=true]{background:var(--gold);border-color:#b37f00;color:var(--green);font-weight:700}" +
    ".bu-word.is-wrong{background:var(--danger-soft);border-color:var(--danger);color:#7a1a12;text-decoration:line-through}" +
    ".bu-word.locked{display:inline-flex;align-items:center;min-height:auto;padding:.1rem .3rem;background:var(--success-soft);border-color:var(--success);color:#14532d;font-weight:700;cursor:default}" +
    "@media (min-width:1100px) and (min-height:900px){.bu-dw-layout{grid-template-columns:2fr 1fr}}");

  /* ============================================================ DIALOG CARDS (self-check) */
  function cardsValidate(d, needAccepted) {
    if (!Array.isArray(d.cards) || d.cards.length < 2) return ['needs a "cards" array with at least 2 cards.'];
    var e = [];
    d.cards.forEach(function (c, i) {
      if (!c || !U.str(c.front) || !U.str(c.back)) e.push("Card " + (i + 1) + ': needs "front" and "back".');
      if (needAccepted && c && c.accepted != null && !Array.isArray(c.accepted)) e.push("Card " + (i + 1) + ': "accepted" must be a list of acceptable answers.');
    });
    return e;
  }
  function cardName(c) { var t = c.front; return t.length > 80 ? t.slice(0, 77) + "…" : t; }

  TYPES.dialogcards = {
    label: "Dialog Cards",
    validate: function (d) { return cardsValidate(d, false).map(function (x) { return "dialogcards " + x; }); },
    render: function (api, d) {
      var h = U.h, cards = d.cards.map(function (c, i) { return { i: i, c: c, misses: 0, done: false }; });
      var queue = d.shuffle === false ? cards.slice() : U.shuffle(cards), mastered = 0;
      api.progress(0, cards.length, "cards mastered");
      function show() {
        var cur = queue[0];
        api.stage.textContent = "";
        var count = h("h2", { id: "bu-card-h", tabindex: "-1" }, "Card " + (mastered + 1) + " of " + cards.length + (cur.misses ? " (another try)" : ""));
        var front = h("div", { class: "bu-face bu-front" }, h("p", { class: "bu-face-label" }, "Prompt"), h("p", { class: "bu-face-text" }, cur.c.front),
          U.str(cur.c.hint) ? h("details", { class: "bu-hint" }, h("summary", null, "Show a hint"), h("p", null, cur.c.hint)) : null);
        var back = h("div", { class: "bu-face bu-back bu-dark", hidden: true }, h("p", { class: "bu-face-label" }, "Answer"), h("p", { class: "bu-face-text", id: "bu-back-text", tabindex: "-1" }, cur.c.back));
        var card = h("div", { class: "bu-flipcard" }, front, back);
        var turn = h("button", { type: "button", class: "bu-btn primary" }, "Turn card");
        var right = h("button", { type: "button", class: "bu-btn gold", hidden: true }, "✓ I got it right");
        var missed = h("button", { type: "button", class: "bu-btn", hidden: true }, "✗ I missed it");
        turn.addEventListener("click", function () {
          front.hidden = true; back.hidden = false; card.classList.add("flipped");
          turn.hidden = true; right.hidden = false; missed.hidden = false;
          document.getElementById("bu-back-text").focus();
          api.announce("Card turned. Did you get it right?");
        });
        right.addEventListener("click", function () {
          queue.shift(); cur.done = true; mastered++;
          api.progress(mastered, cards.length, "cards mastered");
          next();
        });
        missed.addEventListener("click", function () {
          cur.misses++; queue.push(queue.shift());
          api.announce("This card will come back later in the deck.");
          next();
        });
        U.append(api.stage, [count, card, h("div", { class: "bu-actions" }, turn, right, missed),
          h("p", { class: "bu-part-hint" }, "Think of the answer, turn the card, then mark yourself honestly. Missed cards come back until you get them.")]);
      }
      function next() {
        if (!queue.length) {
          api.stage.textContent = "";
          U.append(api.stage, h("p", null, "You worked through the whole deck."));
          api.complete({
            total: cards.length,
            firstTry: cards.filter(function (x) { return !x.misses; }).map(function (x) { return cardName(x.c); }),
            retried: cards.filter(function (x) { return x.misses; }).map(function (x) { return { name: cardName(x.c), misses: x.misses }; })
          });
          return;
        }
        show(); document.getElementById("bu-card-h").focus();
      }
      show();
    }
  };

  /* ============================================================ FLASHCARDS (type the answer) */
  TYPES.flashcards = {
    label: "Flashcards",
    validate: function (d) { return cardsValidate(d, true).map(function (x) { return "flashcards " + x; }); },
    render: function (api, d) {
      var h = U.h, cards = d.cards.map(function (c, i) { return { i: i, c: c, misses: 0 }; });
      var queue = d.shuffle === false ? cards.slice() : U.shuffle(cards), solved = 0;
      api.progress(0, cards.length, "cards answered correctly");
      function ok(card, val) {
        var v = U.norm(val); if (!v) return false;
        return [card.c.back].concat(card.c.accepted || []).some(function (a) { return U.norm(a) === v; });
      }
      function show() {
        var cur = queue[0], counted = false;
        api.stage.textContent = "";
        var count = h("h2", { id: "bu-card-h", tabindex: "-1" }, "Card " + (solved + 1) + " of " + cards.length + (cur.misses ? " (another try)" : ""));
        var input = h("input", { type: "text", id: "bu-fc-input", class: "bu-input", autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
        var feedback = api.feedbackBox();
        var back = h("div", { class: "bu-face bu-back bu-dark", hidden: true }, h("p", { class: "bu-face-label" }, "Answer"), h("p", { class: "bu-face-text" }, cur.c.back));
        var check = h("button", { type: "submit", class: "bu-btn primary" }, "Check");
        var reveal = h("button", { type: "button", class: "bu-btn", hidden: true }, "Show answer");
        var nextBtn = h("button", { type: "button", class: "bu-btn gold", hidden: true }, "Next card");
        var form = h("form", { class: "bu-fc-form", novalidate: true },
          h("label", { for: "bu-fc-input", class: "bu-fc-label" }, "Your answer"), h("div", { class: "bu-fc-row" }, input, check));
        var front = h("div", { class: "bu-face bu-front" }, h("p", { class: "bu-face-label" }, "Prompt"), h("p", { class: "bu-face-text", id: "bu-fc-prompt" }, cur.c.front),
          U.str(cur.c.hint) ? h("details", { class: "bu-hint" }, h("summary", null, "Show a hint"), h("p", null, cur.c.hint)) : null, form);
        input.setAttribute("aria-describedby", "bu-fc-prompt");
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          if (!U.norm(input.value)) { api.setFeedback(feedback, "info", "Type an answer first."); input.focus(); return; }
          if (ok(cur, input.value)) {
            input.readOnly = true; check.disabled = true; reveal.hidden = true;
            back.hidden = false; nextBtn.hidden = false;
            api.setFeedback(feedback, "good", "Correct!");
            queue.shift(); solved++; api.progress(solved, cards.length, "cards answered correctly");
            nextBtn.textContent = queue.length ? "Next card" : "See results";
            nextBtn.focus();
          } else {
            if (!counted) { cur.misses++; counted = true; }
            input.setAttribute("aria-invalid", "true");
            api.setFeedback(feedback, "bad", "Not quite. Try again, or choose Show answer.");
            reveal.hidden = false; input.focus(); input.select();
          }
        });
        input.addEventListener("input", function () { input.removeAttribute("aria-invalid"); });
        reveal.addEventListener("click", function () {
          back.hidden = false; reveal.hidden = true; input.readOnly = true; check.disabled = true;
          if (!counted) { cur.misses++; counted = true; }
          queue.push(queue.shift());
          api.setFeedback(feedback, "info", "The answer is shown. This card will come back later so you can answer it yourself.");
          nextBtn.hidden = false; nextBtn.textContent = "Next card"; nextBtn.focus();
        });
        nextBtn.addEventListener("click", function () {
          if (!queue.length) {
            api.stage.textContent = "";
            U.append(api.stage, h("p", null, "You answered every card correctly."));
            api.complete({
              total: cards.length,
              firstTry: cards.filter(function (x) { return !x.misses; }).map(function (x) { return cardName(x.c); }),
              retried: cards.filter(function (x) { return x.misses; }).map(function (x) { return { name: cardName(x.c), misses: x.misses }; })
            });
            return;
          }
          show(); document.getElementById("bu-card-h").focus();
        });
        U.append(api.stage, [count, h("div", { class: "bu-flipcard" }, front, back), feedback, h("div", { class: "bu-actions" }, reveal, nextBtn)]);
      }
      show();
    }
  };
  CSS_PARTS.push(
    ".bu-flipcard{display:grid;gap:.75rem;perspective:1200px}" +
    ".bu-face{border-radius:10px;padding:clamp(1rem,3vw,1.75rem);border:2px solid var(--line);background:#fff;min-height:9rem;animation:bu-flip .32s ease}" +
    ".bu-front{border-color:var(--gold);background:linear-gradient(180deg,#fff,var(--soft-gold))}" +
    ".bu-back{background:var(--green);border-color:var(--green);color:#fff}.bu-back .bu-face-label{color:var(--gold)}" +
    ".bu-face-label{margin:0 0 .35rem;font-size:.8rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--green)}" +
    ".bu-face-text{margin:0;font-size:clamp(1.1rem,1rem + .6vw,1.4rem);font-weight:700;white-space:pre-line}.bu-face-text:focus{outline:none}" +
    ".bu-flipcard.flipped .bu-back{animation:bu-flip .32s ease}@keyframes bu-flip{from{transform:rotateY(80deg)}to{transform:none}}" +
    ".bu-hint{margin-top:.75rem}.bu-hint summary{cursor:pointer;font-weight:700;color:var(--green);min-height:44px;display:flex;align-items:center}" +
    ".bu-fc-form{margin-top:1rem}.bu-fc-label{display:block;font-weight:700;margin-bottom:.35rem}.bu-fc-row{display:flex;flex-wrap:wrap;gap:.5rem}" +
    ".bu-input{font:inherit;flex:1 1 12rem;min-height:44px;padding:.5rem .75rem;border:2px solid var(--green);border-radius:8px;background:#fff;color:var(--ink)}" +
    ".bu-input[aria-invalid=true]{border-color:var(--danger);background:var(--danger-soft)}");

  /* ============================================================ CROSSWORD */
  function cwClean(a) { return String(a || "").toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Z]/g, ""); }

  function cwLayout(words) {
    function attempt(order) {
      var grid = {}, placed = [];
      function key(r, c) { return r + "," + c; }
      function canPlace(w, r, c, dir) {
        var dr = dir === "down" ? 1 : 0, dc = dir === "across" ? 1 : 0, cross = 0;
        var br = r - dr, bc = c - dc, ar = r + dr * w.length, ac = c + dc * w.length;
        if (grid[key(br, bc)] || grid[key(ar, ac)]) return -1;
        for (var i = 0; i < w.length; i++) {
          var rr = r + dr * i, cc = c + dc * i, cell = grid[key(rr, cc)];
          if (cell) {
            if (cell.ch !== w[i] || cell[dir]) return -1;
            cross++;
          } else {
            if (grid[key(rr + dc, cc + dr)] || grid[key(rr - dc, cc - dr)]) return -1;
          }
        }
        return cross;
      }
      function place(item, r, c, dir) {
        var w = item.answer, dr = dir === "down" ? 1 : 0, dc = dir === "across" ? 1 : 0;
        for (var i = 0; i < w.length; i++) {
          var k = key(r + dr * i, c + dc * i);
          grid[k] = grid[k] || { ch: w[i] };
          grid[k][dir] = true;
        }
        placed.push({ item: item, r: r, c: c, dir: dir });
      }
      function bounds() {
        var rs = [], cs = [];
        Object.keys(grid).forEach(function (k) { var p = k.split(","); rs.push(+p[0]); cs.push(+p[1]); });
        return { r0: Math.min.apply(null, rs), r1: Math.max.apply(null, rs), c0: Math.min.apply(null, cs), c1: Math.max.apply(null, cs) };
      }
      var unplaced = [];
      order.forEach(function (item, n) {
        var w = item.answer;
        if (n === 0) { place(item, 0, 0, "across"); return; }
        var best = null;
        Object.keys(grid).forEach(function (k) {
          var p = k.split(","), gr = +p[0], gc = +p[1], ch = grid[k].ch;
          for (var i = 0; i < w.length; i++) {
            if (w[i] !== ch) continue;
            ["across", "down"].forEach(function (dir) {
              var r = dir === "down" ? gr - i : gr, c = dir === "across" ? gc - i : gc;
              var x = canPlace(w, r, c, dir);
              if (x < 1) return;
              var b = bounds();
              var r0 = Math.min(b.r0, r), c0 = Math.min(b.c0, c);
              var r1 = Math.max(b.r1, dir === "down" ? r + w.length - 1 : r), c1 = Math.max(b.c1, dir === "across" ? c + w.length - 1 : c);
              var h = r1 - r0 + 1, wd = c1 - c0 + 1;
              var score = x * 40 - (h * wd) * 0.5 - Math.abs(h - wd) * 3 + Math.random();
              if (!best || score > best.score) best = { r: r, c: c, dir: dir, score: score };
            });
          }
        });
        if (best) place(item, best.r, best.c, best.dir); else unplaced.push(item);
      });
      var b = bounds();
      return { grid: grid, placed: placed, unplaced: unplaced, b: b, area: (b.r1 - b.r0 + 1) * (b.c1 - b.c0 + 1), rows: b.r1 - b.r0 + 1, cols: b.c1 - b.c0 + 1 };
    }
    var byLen = words.slice().sort(function (a, b) { return b.answer.length - a.answer.length; });
    var best = null;
    for (var t = 0; t < 160; t++) {
      var order = t === 0 ? byLen : [byLen[t % Math.min(3, byLen.length)]].concat(U.shuffle(byLen.filter(function (_, i) { return i !== t % Math.min(3, byLen.length); })));
      var res = attempt(order);
      var sq = Math.max(res.rows, res.cols);
      var score = -res.unplaced.length * 10000 - res.area - sq * 4;
      if (!best || score > best.score) { res.score = score; best = res; }
      if (t > 40 && !best.unplaced.length) break;
    }
    return best;
  }

  TYPES.crossword = {
    label: "Crossword",
    validate: function (d) {
      if (!Array.isArray(d.words) || d.words.length < 3) return ['crossword needs a "words" array with at least 3 {answer, clue} entries.'];
      var e = [], seen = {};
      d.words.forEach(function (w, i) {
        var a = w && cwClean(w.answer);
        if (!w || !U.str(w.clue)) e.push("Word " + (i + 1) + ': missing "clue".');
        if (!a || a.length < 2) e.push("Word " + (i + 1) + ': "answer" needs at least 2 letters (A–Z; spaces and punctuation are removed).');
        else if (seen[a]) e.push('Answer "' + a + '" appears twice.'); else seen[a] = 1;
      });
      if (d.words.length > 20) e.push("crossword supports at most 20 words.");
      if (!e.length) {
        var lay = cwLayout(d.words.map(function (w) { return { answer: cwClean(w.answer), clue: w.clue }; }));
        if (lay.unplaced.length) e.push("These answers share no usable letters with the rest of the puzzle and cannot be placed: " + lay.unplaced.map(function (x) { return x.answer; }).join(", ") + ". Replace them or add words that connect.");
        else d._layout = lay;
      }
      return e;
    },
    render: function (api, d) {
      var h = U.h;
      var lay = d._layout || cwLayout(d.words.map(function (w) { return { answer: cwClean(w.answer), clue: w.clue }; }));
      var R = lay.rows, C = lay.cols, r0 = lay.b.r0, c0 = lay.b.c0;
      var cells = {}, entries = [];
      Object.keys(lay.grid).forEach(function (k) {
        var p = k.split(","); var r = +p[0] - r0, c = +p[1] - c0;
        cells[r + "," + c] = { r: r, c: c, ch: lay.grid[k].ch, words: {}, input: null, num: null };
      });
      var starts = lay.placed.map(function (p) { return { item: p.item, r: p.r - r0, c: p.c - c0, dir: p.dir }; })
        .sort(function (a, b) { return a.r - b.r || a.c - b.c; });
      var num = 0, numAt = {};
      starts.forEach(function (s) {
        var k = s.r + "," + s.c;
        if (!numAt[k]) numAt[k] = ++num;
        s.num = numAt[k]; cells[k].num = numAt[k];
        var e = { num: s.num, dir: s.dir, answer: s.item.answer, clue: s.item.clue, cells: [], locked: false, misses: 0, judged: false };
        for (var i = 0; i < e.answer.length; i++) {
          var cell = cells[(s.r + (s.dir === "down" ? i : 0)) + "," + (s.c + (s.dir === "across" ? i : 0))];
          cell.words[s.dir] = { e: e, i: i };
          e.cells.push(cell);
        }
        entries.push(e);
      });
      var dir = "across", current = null;
      var clueBar = h("p", { class: "bu-cw-current", id: "bu-cw-current" }, "Select a square or a clue to begin.");
      var gridEl = h("div", { class: "bu-cw-grid", role: "group", "aria-label": "Crossword grid, " + R + " rows by " + C + " columns", style: "--cols:" + C + ";--rows:" + R });
      for (var r = 0; r < R; r++) for (var c = 0; c < C; c++) {
        var cell = cells[r + "," + c];
        if (!cell) { gridEl.appendChild(h("div", { class: "bu-cw-block", "aria-hidden": "true" })); continue; }
        var labels = [];
        ["across", "down"].forEach(function (dd) { var w = cell.words[dd]; if (w) labels.push(w.e.num + " " + dd + ", letter " + (w.i + 1) + " of " + w.e.answer.length); });
        var inp = h("input", { type: "text", class: "bu-cw-input", maxlength: "2", autocomplete: "off", autocapitalize: "characters", spellcheck: "false", inputmode: "text",
          "aria-label": labels.join("; "), "aria-describedby": "bu-cw-current" });
        cell.input = inp; inp._cell = cell;
        gridEl.appendChild(h("div", { class: "bu-cw-cell" }, cell.num ? h("span", { class: "bu-cw-num", "aria-hidden": "true" }, String(cell.num)) : null, inp));
        bindCell(cell);
      }
      function wordAt(cell, dd) { return cell.words[dd] ? cell.words[dd].e : null; }
      function setCurrent(cell, dd) {
        if (dd && cell.words[dd]) dir = dd; else if (!cell.words[dir]) dir = dir === "across" ? "down" : "across";
        var e = wordAt(cell, dir);
        Object.keys(cells).forEach(function (k) { cells[k].input.parentNode.classList.remove("in-word"); });
        entries.forEach(function (x) { x.clueBtn.classList.remove("active"); });
        if (e) { e.cells.forEach(function (x) { x.input.parentNode.classList.add("in-word"); }); e.clueBtn.classList.add("active"); clueBar.textContent = e.num + " " + dir + ": " + e.clue + " (" + e.answer.length + " letters)"; }
        current = e;
      }
      function move(cell, step) {
        var e = wordAt(cell, dir); if (!e) return;
        var i = cell.words[dir].i + step;
        if (i >= 0 && i < e.cells.length) e.cells[i].input.focus();
      }
      function bindCell(cell) {
        var inp = cell.input;
        inp.addEventListener("focus", function () { setCurrent(cell); inp.select(); });
        inp.addEventListener("click", function () { if (cell.words.across && cell.words.down && current && current.cells.indexOf(cell) >= 0 && document.activeElement === inp) setCurrent(cell, dir === "across" ? "down" : "across"); });
        inp.addEventListener("input", function () {
          var v = cwClean(inp.value).slice(-1);
          inp.value = v;
          inp.parentNode.classList.remove("is-wrong"); inp.removeAttribute("aria-invalid");
          if (v) { var e = wordAt(cell, dir); if (e) { var i = cell.words[dir].i; for (var j = i + 1; j < e.cells.length; j++) { if (!e.cells[j].input.readOnly) { e.cells[j].input.focus(); break; } } } }
        });
        inp.addEventListener("keydown", function (ev) {
          var k = ev.key, dr = 0, dc = 0;
          if (k === "Backspace" && !inp.value) { ev.preventDefault(); var e = wordAt(cell, dir); if (e) { var i = cell.words[dir].i; if (i > 0) { var p = e.cells[i - 1].input; if (!p.readOnly) p.value = ""; p.focus(); } } return; }
          if (k === "ArrowRight") dc = 1; else if (k === "ArrowLeft") dc = -1; else if (k === "ArrowDown") dr = 1; else if (k === "ArrowUp") dr = -1; else return;
          ev.preventDefault();
          var want = dc ? "across" : "down";
          if (dir !== want && cell.words[want]) { setCurrent(cell, want); return; }
          var rr = cell.r + dr, cc = cell.c + dc;
          while (rr >= 0 && rr < R && cc >= 0 && cc < C) { var nx = cells[rr + "," + cc]; if (nx) { if (nx.words[want]) dir = want; nx.input.focus(); return; } rr += dr; cc += dc; }
        });
      }
      function clueList(dd) {
        return h("section", { class: "bu-cw-clues", "aria-labelledby": "bu-cw-" + dd }, h("h2", { id: "bu-cw-" + dd }, dd === "across" ? "Across" : "Down"),
          h("ol", null, entries.filter(function (e) { return e.dir === dd; }).sort(function (a, b) { return a.num - b.num; }).map(function (e) {
            e.clueBtn = h("button", { type: "button", class: "bu-cw-clue" }, h("span", { class: "bu-cw-cn" }, e.num + "."), " " + e.clue + " (" + e.answer.length + ")");
            e.state = h("span", { class: "bu-sr" });
            e.clueBtn.appendChild(e.state);
            e.clueBtn.addEventListener("click", function () {
              dir = e.dir;
              var target = e.cells.filter(function (x) { return !x.input.value && !x.input.readOnly; })[0] || e.cells[0];
              target.input.focus(); setCurrent(target, e.dir);
            });
            return h("li", { value: String(e.num) }, e.clueBtn);
          })));
      }
      var feedback = api.feedbackBox();
      var check = h("button", { type: "button", class: "bu-btn primary" }, "Check answers");
      check.addEventListener("click", function () {
        var right = 0, wrongWords = 0, incomplete = 0, firstBad = null;
        entries.forEach(function (e) {
          if (e.locked) { right++; return; }
          var filled = e.cells.every(function (x) { return x.input.value; });
          var ok = e.cells.every(function (x) { return x.input.value === x.ch; });
          if (ok) {
            e.locked = true; right++;
            e.cells.forEach(function (x) { x.input.readOnly = true; x.input.parentNode.classList.add("is-right"); });
            e.clueBtn.classList.add("done"); e.state.textContent = " (solved)";
          } else if (filled) {
            wrongWords++; e.misses++;
            e.cells.forEach(function (x) { if (x.input.value !== x.ch && !x.input.readOnly) { x.input.parentNode.classList.add("is-wrong"); x.input.setAttribute("aria-invalid", "true"); if (!firstBad) firstBad = x.input; } });
          } else incomplete++;
        });
        api.progress(right, entries.length, "words solved");
        if (right === entries.length) {
          check.disabled = true;
          api.setFeedback(feedback, "good", "The whole puzzle is solved.");
          var name = function (e) { return e.num + " " + e.dir + ": " + e.answer; };
          api.complete({
            total: entries.length,
            firstTry: entries.filter(function (e) { return !e.misses; }).map(name),
            retried: entries.filter(function (e) { return e.misses; }).map(function (e) { return { name: name(e), misses: e.misses }; })
          });
        } else {
          var msg = right + " of " + entries.length + " words solved.";
          if (wrongWords) msg += " " + wrongWords + (wrongWords === 1 ? " filled word has" : " filled words have") + " wrong letters (marked in red).";
          if (incomplete) msg += " " + incomplete + (incomplete === 1 ? " word is" : " words are") + " not filled in yet.";
          api.setFeedback(feedback, wrongWords ? "bad" : "info", msg);
          if (firstBad) firstBad.focus();
        }
      });
      api.progress(0, entries.length, "words solved");
      U.append(api.stage, [
        h("p", { class: "bu-part-hint" }, "Type in the squares. Arrow keys move between squares; select a clue to jump to its word."),
        h("div", { class: "bu-cw-layout" }, h("div", { class: "bu-cw-board" }, clueBar, gridEl), h("div", { class: "bu-cw-cluecols" }, clueList("across"), clueList("down"))),
        h("div", { class: "bu-actions" }, check), feedback]);
    }
  };
  CSS_PARTS.push(
    ".bu-cw-layout{display:grid;gap:1rem;margin-top:.5rem}.bu-cw-board{min-width:0}" +
    ".bu-cw-current{margin:0 0 .5rem;padding:.5rem .75rem;background:var(--soft-gold);border-left:5px solid var(--gold);border-radius:6px;font-weight:700;min-height:2.6rem}" +
    ".bu-cw-grid{--cell:min(44px,calc((100vw - 3.5rem) / var(--cols)));display:grid;grid-template-columns:repeat(var(--cols),var(--cell));grid-auto-rows:var(--cell);gap:0;width:max-content;max-width:100%;border:2px solid var(--green);background:var(--green)}" +
    ".bu-cw-block{background:var(--green)}" +
    ".bu-cw-cell{position:relative;background:#fff;border:1px solid #7b8f86}" +
    ".bu-cw-cell.in-word{background:var(--soft-gold)}.bu-cw-cell.is-right{background:var(--success-soft)}.bu-cw-cell.is-wrong{background:var(--danger-soft);box-shadow:inset 0 0 0 2px var(--danger)}" +
    ".bu-cw-num{position:absolute;top:1px;left:2px;font-size:calc(var(--cell) * .26);font-weight:700;line-height:1;color:var(--ink);pointer-events:none}" +
    ".bu-cw-input{width:100%;height:100%;border:0;background:transparent;text-align:center;font:inherit;font-weight:800;font-size:calc(var(--cell) * .5);padding:calc(var(--cell) * .12) 0 0;color:var(--ink);caret-color:var(--green);border-radius:0;text-transform:uppercase}" +
    ".bu-cw-input:focus{outline:3px solid var(--green);outline-offset:-3px;background:#fff8e1}" +
    ".bu-cw-cluecols{display:grid;gap:1rem}.bu-cw-clues ol{list-style:none;margin:0;padding:0;display:grid;gap:.25rem}" +
    ".bu-cw-clue{font:inherit;text-align:left;width:100%;min-height:44px;padding:.35rem .6rem;border:2px solid transparent;border-radius:6px;background:transparent;color:var(--ink);cursor:pointer}" +
    ".bu-cw-clue:hover{background:var(--soft-green)}.bu-cw-clue.active{border-color:var(--gold);background:var(--soft-gold)}.bu-cw-clue.done{color:#14532d}.bu-cw-clue.done .bu-cw-cn::after{content:' \\2713'}" +
    ".bu-cw-cn{font-weight:800;color:var(--green)}" +
    "@media (min-width:640px){.bu-cw-cluecols{grid-template-columns:1fr 1fr}}" +
    "@media (min-width:1100px) and (min-height:900px){.bu-cw-layout{grid-template-columns:auto 1fr;align-items:start}.bu-cw-grid{--cell:min(48px,calc(40rem / var(--cols)))}.bu-cw-cluecols{grid-template-columns:1fr}}");

  /* ============================================================ SORT THE STEPS (puzzle) */
  TYPES.sort = {
    label: "Sequence Puzzle",
    validate: function (d) {
      if (!Array.isArray(d.items) || d.items.length < 3) return ['sort needs an "items" array (at least 3) listed in the CORRECT order.'];
      if (d.items.length > 12) return ["sort supports at most 12 items."];
      var e = [];
      d.items.forEach(function (t, i) { if (!U.str(typeof t === "string" ? t : t && t.text)) e.push("Item " + (i + 1) + " is empty."); });
      return e;
    },
    render: function (api, d) {
      var h = U.h;
      var items = d.items.map(function (t, i) { return { pos: i, text: typeof t === "string" ? t : t.text, misses: 0 }; });
      var order = U.shuffle(items), tries = 0;
      while (items.length > 2 && order.every(function (x, i) { return x.pos === i; }) && tries++ < 20) order = U.shuffle(items);
      var list = h("ol", { class: "bu-sort-list" });
      var feedback = api.feedbackBox();
      function render(focusItem, focusWhich) {
        list.textContent = "";
        order.forEach(function (it, i) {
          var up = h("button", { type: "button", class: "bu-btn small", "aria-label": "Move up: " + it.text, disabled: i === 0 }, "↑");
          var down = h("button", { type: "button", class: "bu-btn small", "aria-label": "Move down: " + it.text, disabled: i === order.length - 1 }, "↓");
          up.addEventListener("click", function () { moveTo(it, i - 1, "up"); });
          down.addEventListener("click", function () { moveTo(it, i + 1, "down"); });
          var grip = h("span", { class: "bu-sort-grip", "aria-hidden": "true" }, "☰");
          var state = h("span", { class: "bu-sort-state" });
          if (it.status) { U.append(state, [U.mark(it.status === "ok"), h("span", { class: "bu-sr" }, it.status === "ok" ? "In the correct position" : "Not in the correct position")]); }
          var li = h("li", { class: "bu-sort-item" + (it.status === "ok" ? " is-right" : it.status === "bad" ? " is-wrong" : "") }, grip,
            h("span", { class: "bu-sort-text" }, it.text), state, h("span", { class: "bu-sort-btns" }, up, down));
          li._item = it;
          li.setAttribute("data-drop", "pos-" + i);
          U.makeDraggable(li, {
            onDrop: function (zone, e) {
              if (!zone || !zone._item || zone._item === it) return;
              var rect = zone.getBoundingClientRect();
              var target = order.indexOf(zone._item);
              var cur = order.indexOf(it);
              var after = e.clientY > rect.top + rect.height / 2;
              var dest = target + (after ? 1 : 0); if (cur < dest) dest--;
              moveTo(it, dest, null);
            }
          });
          list.appendChild(li);
          if (focusItem === it) setTimeout(function () { var b = focusWhich === "up" ? (up.disabled ? down : up) : (down.disabled ? up : down); b.focus(); }, 0);
        });
      }
      function moveTo(it, dest, which) {
        var cur = order.indexOf(it);
        dest = Math.max(0, Math.min(order.length - 1, dest));
        if (dest === cur) return;
        order.splice(cur, 1); order.splice(dest, 0, it);
        order.forEach(function (x) { x.status = null; });
        render(it, which || "up");
        api.announce(it.text + " moved to position " + (dest + 1) + " of " + order.length + ".");
      }
      var check = h("button", { type: "button", class: "bu-btn primary" }, "Check order");
      check.addEventListener("click", function () {
        var right = 0;
        order.forEach(function (it, i) { if (it.pos === i) { it.status = "ok"; right++; } else { it.status = "bad"; it.misses++; } });
        render();
        api.progress(right, items.length, "in the correct position");
        if (right === items.length) {
          check.disabled = true;
          list.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
          api.setFeedback(feedback, "good", "Everything is in the correct order.");
          api.complete({
            total: items.length,
            firstTry: items.filter(function (x) { return !x.misses; }).map(function (x) { return x.text; }),
            retried: items.filter(function (x) { return x.misses; }).map(function (x) { return { name: x.text, misses: x.misses }; })
          });
        } else {
          api.setFeedback(feedback, "bad", right + " of " + items.length + " are in the correct position. Items marked ✗ need to move.");
        }
      });
      api.progress(0, items.length, "in the correct position");
      render();
      U.append(api.stage, [h("p", { class: "bu-part-hint" }, "Put the items in the correct order. Drag an item, or use its ↑ and ↓ buttons, then choose Check order."),
        list, h("div", { class: "bu-actions" }, check), feedback]);
    }
  };

  /* ============================================================ BRANCHING SCENARIO */
  TYPES.branching = {
    label: "Branching Scenario",
    validate: function (d) {
      var e = [];
      if (!d.scenes || typeof d.scenes !== "object") return ['branching needs a "scenes" object keyed by scene id.'];
      var start = d.start || "start";
      if (!d.scenes[start]) e.push('Start scene "' + start + '" not found in "scenes".');
      var endings = 0;
      Object.keys(d.scenes).forEach(function (id) {
        var s = d.scenes[id];
        if (!s || !U.str(s.title)) e.push('Scene "' + id + '": missing "title".');
        if (!s) return;
        if (s.ending) { endings++; return; }
        if (!Array.isArray(s.choices) || s.choices.length < 2) e.push('Scene "' + id + '": needs 2+ "choices" (or "ending": true).');
        else s.choices.forEach(function (c, i) {
          if (!U.str(c.label)) e.push('Scene "' + id + '", choice ' + (i + 1) + ': missing "label".');
          if (!d.scenes[c.next]) e.push('Scene "' + id + '", choice ' + (i + 1) + ': "next" points to unknown scene "' + c.next + '".');
        });
      });
      if (!endings) e.push('branching needs at least one scene with "ending": true.');
      return e;
    },
    render: function (api, d) {
      var h = U.h, start = d.start || "start", path = [], history = [], cur = start, ended = false;
      var TONE = { good: "Strong outcome", mixed: "Mixed outcome", poor: "Weak outcome" };
      var depth = (function () {
        var best = 1, seen = {};
        (function walk(id, n) { if (seen[id] || n > 30) return; seen[id] = 1; var s = d.scenes[id]; if (s.ending) { best = Math.max(best, n); } else s.choices.forEach(function (c) { walk(c.next, n + 1); }); seen[id] = 0; })(start, 0);
        return best;
      })();
      var sceneBox = h("div", { class: "bu-br-scene" });
      var pathList = h("ol", { class: "bu-br-path" });
      var back = h("button", { type: "button", class: "bu-btn small" }, "← Back");
      var restart = h("button", { type: "button", class: "bu-btn small" }, "Start over");
      back.addEventListener("click", function () { if (!history.length) return; var s = history.pop(); cur = s.cur; path = s.path; show(); });
      restart.addEventListener("click", function () { history = []; path = []; cur = start; show(); });
      function show(noFocus) {
        var s = d.scenes[cur];
        sceneBox.textContent = "";
        U.append(sceneBox, h("h2", { id: "bu-br-h", tabindex: "-1" }, s.title));
        if (path.length) { var last = path[path.length - 1]; if (U.str(last.feedback)) U.append(sceneBox, h("p", { class: "bu-br-fb" }, h("strong", null, "Result of your choice: "), last.feedback)); }
        U.paragraphs(s.text || s.body || "").forEach(function (p) { U.append(sceneBox, h("p", null, p)); });
        if (s.ending) {
          var tone = TONE[s.tone] || "Ending";
          U.append(sceneBox, h("p", { class: "bu-br-tone tone-" + (s.tone || "mixed") }, tone));
          if (U.str(s.debrief)) U.append(sceneBox, h("div", { class: "bu-br-debrief" }, h("h3", null, "Debrief"), U.paragraphs(s.debrief).map(function (p) { return h("p", null, p); })));
          U.append(sceneBox, h("div", { class: "bu-actions" }, h("button", { type: "button", class: "bu-btn", onclick: function () { history = []; path = []; cur = start; show(); } }, "Try another path")));
          if (!ended) {
            ended = true;
            api.complete({
              total: 1, score: 100,
              headline: "You reached an ending: “" + s.title + "” (" + tone.toLowerCase() + "). You can go back and explore other choices.",
              custom: h("div", null, h("h3", null, "The path you took"), h("ol", null, path.map(function (p) { return h("li", null, p.label); })))
            });
          }
        } else {
          U.append(sceneBox, h("h3", { class: "bu-br-q" }, s.prompt || "What do you do?"));
          U.append(sceneBox, h("ul", { class: "bu-br-choices" }, s.choices.map(function (c, i) {
            var b = h("button", { type: "button", class: "bu-br-choice" }, h("span", { class: "bu-br-letter", "aria-hidden": "true" }, String.fromCharCode(65 + i)), h("span", null, c.label));
            b.addEventListener("click", function () { history.push({ cur: cur, path: path.slice() }); path = path.concat([{ label: c.label, feedback: c.feedback }]); cur = c.next; show(); });
            return h("li", null, b);
          })));
        }
        pathList.textContent = "";
        if (!path.length) U.append(pathList, h("li", { class: "bu-br-empty" }, "No choices yet."));
        path.forEach(function (p) { U.append(pathList, h("li", null, p.label)); });
        back.disabled = !history.length; restart.disabled = !history.length;
        api.progress(Math.min(path.length, depth), depth, "decisions made");
        if (!noFocus) { var hd = document.getElementById("bu-br-h"); if (hd) hd.focus(); }
      }
      U.append(api.stage, h("div", { class: "bu-br-layout" }, sceneBox,
        h("aside", { class: "bu-br-side", "aria-labelledby": "bu-br-path-h" }, h("h2", { id: "bu-br-path-h" }, "Your path"), pathList, h("div", { class: "bu-actions" }, back, restart))));
      show(true);
    }
  };
  CSS_PARTS.push(
    ".bu-sort-list{list-style:none;margin:.5rem 0 0;padding:0;display:grid;gap:.5rem;counter-reset:s}" +
    ".bu-sort-item{counter-increment:s;display:flex;align-items:center;gap:.6rem;padding:.5rem .6rem;border:2px solid var(--line);border-radius:8px;background:#fff;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none}" +
    ".bu-sort-item::before{content:counter(s);font-weight:900;color:var(--green);min-width:1.4rem;text-align:center}" +
    ".bu-sort-item.dragging{box-shadow:0 12px 28px rgba(0,0,0,.25);position:relative;z-index:50;pointer-events:none;background:var(--soft-gold)}" +
    ".bu-sort-item.is-right{border-color:var(--success);background:var(--success-soft)}.bu-sort-item.is-wrong{border-color:var(--danger);background:var(--danger-soft)}" +
    ".bu-sort-grip{color:var(--muted)}.bu-sort-text{flex:1;min-width:0}.bu-sort-btns{display:flex;gap:.3rem}.bu-sort-state:empty{display:none}" +
    ".bu-br-layout{display:grid;gap:1rem}.bu-br-scene p{margin:0 0 .75rem}.bu-br-fb{padding:.6rem .8rem;background:var(--soft-gold);border-left:5px solid var(--gold);border-radius:6px}" +
    ".bu-br-q{margin-top:1rem}.bu-br-choices{list-style:none;margin:0;padding:0;display:grid;gap:.5rem}" +
    ".bu-br-choice{font:inherit;display:flex;gap:.75rem;align-items:flex-start;width:100%;text-align:left;min-height:44px;padding:.7rem .9rem;border:2px solid var(--green);border-radius:8px;background:#fff;color:var(--ink);cursor:pointer}" +
    ".bu-br-choice:hover{background:var(--soft-green)}.bu-br-letter{flex:0 0 auto;display:inline-grid;place-items:center;width:1.8rem;height:1.8rem;border-radius:50%;background:var(--green);color:#fff;font-weight:800}" +
    ".bu-br-side{border:2px solid var(--line);border-radius:8px;padding:.75rem;background:#fbfdfc;align-self:start}.bu-br-side h2{font-size:1.05rem}.bu-br-path{margin:0;padding-left:1.25rem}.bu-br-empty{list-style:none;margin-left:-1.25rem;color:var(--muted)}" +
    ".bu-br-tone{display:inline-block;padding:.35rem .8rem;border-radius:999px;font-weight:800;border:2px solid}" +
    ".bu-br-tone.tone-good{background:var(--success-soft);border-color:var(--success);color:#14532d}.bu-br-tone.tone-mixed{background:var(--soft-gold);border-color:#b37f00;color:var(--ink)}.bu-br-tone.tone-poor{background:var(--danger-soft);border-color:var(--danger);color:#7a1a12}" +
    ".bu-br-debrief{margin-top:.75rem;padding:.75rem 1rem;border:2px solid var(--line);border-radius:8px;background:#fff}" +
    "@media (min-width:900px){.bu-br-layout{grid-template-columns:1fr 16rem}}@media (min-width:1100px) and (min-height:900px){.bu-sort-item{padding:.3rem .6rem}.bu-sort-list{gap:.4rem}}");

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
