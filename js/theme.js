// ============================================================
// Fargo Capitol — theme toggle
// ============================================================
(function () {
  const KEY = "wsc_theme";
  const root = document.documentElement;

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
  }

  function currentTheme() {
    return localStorage.getItem(KEY) || "dark";
  }

  applyTheme(currentTheme());

  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;

    btn.addEventListener("click", function (e) {
      const next = currentTheme() === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      applyTheme(next);
    });
  });
})();
