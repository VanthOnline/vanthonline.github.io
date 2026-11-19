/* Vanth Online - Development Chronicle
   Lightweight enhancements: scroll progress bar, status filters,
   chronicle collapsing, back-to-top. The page is fully readable
   with JavaScript disabled (nothing is collapsed without it). */

(function () {
  "use strict";

  /* Verified lines from the installed Wreckwater tutorial dialogue. */
  var openingQuote = document.getElementById("openingQuote");
  var openingLines = [
    "The sea's full of people who know where they're going. Funny how many of 'em end up somewhere else.",
    "Ye won't get far in Wreckwater Reach without knowing what keeps a blade out of yer ribs.",
    "Are ye Ready for Training or have I misjudged you?"
  ];
  if (openingQuote) {
    openingQuote.textContent = openingLines[Math.floor(Math.random() * openingLines.length)];
  }

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

  /* ---------- timeline: filters + two-stage collapse ---------- */
  var filterBar = document.getElementById("filters");
  var timelineList = document.getElementById("timelineList");
  var entries = Array.prototype.slice.call(document.querySelectorAll(".entry"));

  var COLLAPSE_FROM = 3;   /* first 3 entries stay fully expanded */
  var ARCHIVE_FROM = 10;   /* entries after the 10th sit behind the reveal button */

  var state = { currentFilter: "all", archiveRevealed: false };

  function applyVisibility() {
    entries.forEach(function (entry, idx) {
      var matches =
        state.currentFilter === "all" ||
        entry.getAttribute("data-status") === state.currentFilter;
      var archived = idx >= ARCHIVE_FROM && !state.archiveRevealed;
      if (archived || !matches) entry.classList.add("hidden");
      else entry.classList.remove("hidden");
    });
  }

  if (entries.length && timelineList) {
    /* per-entry collapse toggles (entries after the third) */
    entries.forEach(function (entry, idx) {
      if (idx < COLLAPSE_FROM) return;

      entry.classList.add("collapsed");
      var body = entry.querySelector(".entry-body");
      var chip = body ? body.querySelector(".chip") : null;

      var btn = document.createElement("button");
      btn.className = "entry-toggle";
      btn.type = "button";
      btn.textContent = "Details";
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var nowCollapsed = entry.classList.toggle("collapsed");
        btn.setAttribute("aria-expanded", nowCollapsed ? "false" : "true");
        btn.textContent = nowCollapsed ? "Details" : "Hide details";
      });

      if (body) {
        var row = document.createElement("div");
        row.className = "entry-details-row";
        if (chip) {
          body.insertBefore(row, chip);
          row.appendChild(chip);
        }
        row.appendChild(btn);
        body.appendChild(row);
      }
    });

    /* archive reveal button after the 10th entry */
    if (entries.length > ARCHIVE_FROM) {
      var hiddenCount = entries.length - ARCHIVE_FROM;
      var archBtn = document.createElement("button");
      archBtn.className = "archive-toggle";
      archBtn.type = "button";
      archBtn.textContent = "Show older milestones (" + hiddenCount + ")";
      var anchor = entries[ARCHIVE_FROM - 1];
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(archBtn, anchor.nextSibling);
      } else {
        timelineList.appendChild(archBtn);
      }
      archBtn.addEventListener("click", function () {
        state.archiveRevealed = true;
        applyVisibility();
        archBtn.parentNode.removeChild(archBtn);
      });
    }

    /* status filters (integrated with collapse/archive state) */
    if (filterBar) {
      filterBar.addEventListener("click", function (ev) {
        var btn = ev.target.closest(".filter");
        if (!btn) return;

        Array.prototype.forEach.call(filterBar.querySelectorAll(".filter"), function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        state.currentFilter = btn.getAttribute("data-filter");
        applyVisibility();
      });
    }

    applyVisibility();
  }
})();
