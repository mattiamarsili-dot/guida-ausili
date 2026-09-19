/* Evidenzia automaticamente il valore migliore per ogni metrica comparabile
   (peso, portata max, ecc.), sia nella tabella di confronto rapido sia nelle
   schede prodotto. Nessun valore è hardcoded: la logica legge data-metric /
   data-value / data-strategy dal markup e confronta solo all'interno della
   stessa sottocategoria (.category), dove il confronto ha senso. */
(function () {
  "use strict";

  function computeBest(section, metric) {
    var els = Array.prototype.slice.call(
      section.querySelectorAll('[data-metric="' + metric + '"]')
    );
    if (els.length < 2) return;

    var strategy = els[0].getAttribute("data-strategy");
    var values = els
      .map(function (el) { return parseFloat(el.getAttribute("data-value")); })
      .filter(function (v) { return !isNaN(v); });
    if (values.length < 2) return;

    var best = strategy === "higher" ? Math.max.apply(null, values) : Math.min.apply(null, values);
    var bestEls = els.filter(function (el) {
      return parseFloat(el.getAttribute("data-value")) === best;
    });
    if (bestEls.length === els.length) return; // tutti uguali: nessun "migliore" reale

    bestEls.forEach(function (el) {
      el.classList.add("is-best");
      if (el.tagName === "TD") {
        el.innerHTML =
          '<span class="cell-value"><svg class="best-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>' +
          el.innerHTML +
          '<span class="best-badge">Migliore</span></span>';
      } else {
        var badge = document.createElement("span");
        badge.className = "spec-best-badge";
        badge.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>Migliore';
        el.appendChild(badge);
      }
    });
  }

  document.querySelectorAll(".category").forEach(function (section) {
    var metrics = [];
    section.querySelectorAll("[data-metric]").forEach(function (el) {
      var m = el.getAttribute("data-metric");
      if (metrics.indexOf(m) === -1) metrics.push(m);
    });
    metrics.forEach(function (m) { computeBest(section, m); });
  });
})();
