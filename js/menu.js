/* ==========================================================================
   BioDesign — menu.js
   Controla o menu lateral: abertura/fechamento no mobile (hambúrguer),
   overlay, fechamento por tecla ESC e o indicador de link ativo entre
   as seções (usado também por scroll.js).
   ========================================================================== */

(function () {
  "use strict";

  const sidebar = document.getElementById("sidebar");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const overlay = document.getElementById("sidebarOverlay");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sidebar || !hamburgerBtn || !overlay) return;

  /**
   * Abre o menu lateral (mobile).
   */
  function openMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("open");
    hamburgerBtn.classList.add("open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    hamburgerBtn.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  }

  /**
   * Fecha o menu lateral (mobile).
   */
  function closeMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
    hamburgerBtn.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    const isOpen = sidebar.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  }

  hamburgerBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  // Fecha com a tecla ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebar.classList.contains("open")) {
      closeMenu();
    }
  });

  // Fecha o menu ao clicar em um link (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) closeMenu();
    });
  });

  /**
   * Marca visualmente o link correspondente à seção ativa.
   * Exposta em window para ser chamada pelo IntersectionObserver
   * de scroll.js sempre que a seção em foco mudar.
   */
})();
