/* ==========================================================================
   BioDesign — script.js
   Ponto de entrada geral: Scroll Reveal (IntersectionObserver), acordeão
   do FAQ, formulário de newsletter, ano dinâmico no rodapé e reforço do
   lazy loading em navegadores sem suporte nativo.
   Os módulos de menu, scroll e galeria vivem em arquivos próprios
   (menu.js, scroll.js, gallery.js) e são carregados antes deste arquivo.
   ========================================================================== */

/* ---------- 0. TELA DE CARREGAMENTO (PRELOADER) ----------
     A barra branca é animada via CSS (ver animations.css). Aqui só
     controlamos quando ela some: aguardamos a página carregar por
     completo (window "load") e garantimos um tempo mínimo visível,
     para a barra não "piscar" em conexões muito rápidas. */
  const preloader = document.getElementById("preloader");
 
  function hidePreloader() {
    if (!preloader) return;
    document.body.classList.remove("is-loading");
    preloader.classList.add("loaded");
 
    // Retira o preloader do fluxo após a transição, para que ele
    // não fique invisível mas ainda capturando espaço/cliques.
    window.setTimeout(() => {
      preloader.style.display = "none";
    }, 700);
  }
 
  if (preloader) {
    const minVisibleTime = 1200; // ms — tempo mínimo para a barra ser percebida
    const startTime = performance.now();
 
    window.addEventListener("load", () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(minVisibleTime - elapsed, 0);
      window.setTimeout(hidePreloader, remaining);
    });
 
    // Rede de segurança: se algo travar o evento "load", libera o
    // site mesmo assim depois de um tempo razoável.
    window.setTimeout(hidePreloader, 6000);
  }

/*  SCROLL SUAVE -------------*/ 
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------- 1. SCROLL REVEAL ----------
     Cada elemento com [data-reveal] recebe .is-visible quando entra na
     viewport. O atributo data-delay (0, 1, 2...) alimenta a variável
     CSS --reveal-delay, escalonando a entrada dos elementos vizinhos. */
  const revealEls = document.querySelectorAll("[data-reveal]");

  revealEls.forEach((el) => {
    const delay = el.getAttribute("data-delay") || 0;
    el.style.setProperty("--reveal-delay", delay);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // anima uma única vez
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- 2. ACORDEÃO DO FAQ ---------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Fecha os outros itens abertos, mantendo apenas um por vez
      faqItems.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- 3. FORMULÁRIO DE NEWSLETTER ---------- */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterFeedback = document.getElementById("newsletterFeedback");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = document.getElementById("newsletterEmail");
      const email = emailInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        newsletterFeedback.textContent = "Digite um e-mail válido.";
        newsletterFeedback.style.color = "#e3a5a5";
        return;
      }

      // Sem backend conectado: apenas confirma visualmente o cadastro.
      newsletterFeedback.textContent = "Inscrição confirmada. Obrigado!";
      newsletterFeedback.style.color = "";
      newsletterForm.reset();
    });
  }

  /* ---------- 4. ANO DINÂMICO NO RODAPÉ ---------- */
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 5. REFORÇO DE LAZY LOADING ----------
     As imagens já usam loading="lazy" nativamente. Para navegadores
     que não suportam o atributo, este bloco carrega as imagens
     próximas da viewport via IntersectionObserver como fallback. */
  const supportsNativeLazy = "loading" in HTMLImageElement.prototype;

  if (!supportsNativeLazy) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("src");
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => lazyObserver.observe(img));
  }
});
