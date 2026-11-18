/* Vanth Online - Development Chronicle
   Lightweight enhancements: scroll progress bar, status filters,
   back-to-top. The page is fully readable with JavaScript disabled. */

(function () {
  "use strict";

  /* ---------- scroll progress bar ---------- */
  var bar = document.getElementById("progressBar");
  var toTop = document.getElementById("toTop");

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    if (bar) bar.style.width = pct + "%";
    if (toTop) {
      if (doc.scrollTop > 500) toTop.classList.add("visible");
      else toTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- back to top ---------- */
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- timeline status filters ---------- */
  var filterBar = document.getElementById("filters");
  var entries = Array.prototype.slice.call(document.querySelectorAll(".entry"));

  if (filterBar && entries.length) {
    filterBar.addEventListener("click", function (ev) {
      var btn = ev.target.closest(".filter");
      if (!btn) return;

      Array.prototype.forEach.call(filterBar.querySelectorAll(".filter"), function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      var filter = btn.getAttribute("data-filter");
      entries.forEach(function (entry) {
        if (filter === "all" || entry.getAttribute("data-status") === filter) {
          entry.classList.remove("hidden");
        } else {
          entry.classList.add("hidden");
        }
      });
    });
  }
})();
