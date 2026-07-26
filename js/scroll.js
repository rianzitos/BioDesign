/* ==========================================================================
   BioDesign — scroll.js
   Responsável por: parallax suave no Hero, destaque do menu conforme a
   seção visível (IntersectionObserver), botão "voltar ao topo" e o
   efeito sutil de sombra no menu lateral ao rolar a página.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- 1. Parallax suave no Hero ---------- */
  const heroImg = document.getElementById("heroImg");
  const hero = document.getElementById("hero");
  let ticking = false;

  function applyParallax() {
    if (!heroImg || !hero) return;
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    // Só aplica o efeito enquanto o Hero estiver visível, evitando
    // cálculos desnecessários depois que o usuário já rolou bastante.
    if (scrollY < heroHeight) {
      const offset = scrollY * 0.35;
      heroImg.style.transform = `translateY(${offset}px)`;
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(applyParallax);
      ticking = true;
    }
  });

  /* ---------- 2. Menu lateral com leve sombra extra ao rolar ---------- */
  const sidebar = document.getElementById("sidebar");

  function toggleSidebarShadow() {
    if (!sidebar) return;
    sidebar.classList.toggle("scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", toggleSidebarShadow, { passive: true });

  /* ---------- 3. Botão "voltar ao topo" ---------- */
  const backToTopBtn = document.getElementById("backToTop");

  function toggleBackToTop() {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle("visible", window.scrollY > 600);
  }

  window.addEventListener("scroll", toggleBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 4. Navbar destacando a seção atual (IntersectionObserver) ---------- */
  const sections = document.querySelectorAll("main section[id]");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && window.BioDesignMenu) {
          window.BioDesignMenu.setActiveLink(entry.target.id);
        }
      });
    },
    {
      // Considera a seção "ativa" quando cruza a faixa central da tela
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------- 5. Rolagem suave para links internos (fallback extra) ----------
     O CSS já define scroll-behavior: smooth, mas mantemos o fallback em
     JS para navegadores mais antigos e para compensar o pequeno respiro
     visual no topo da seção. */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length <= 1) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Inicializa os estados assim que o script carrega
  toggleSidebarShadow();
  toggleBackToTop();
})();
