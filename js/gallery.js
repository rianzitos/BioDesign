/* ==========================================================================
   BioDesign — gallery.js
   Lightbox para a galeria e para o projeto em destaque: abre a imagem em
   tela cheia com animação suave, navega entre imagens e fecha via botão,
   clique fora, ou tecla ESC / setas do teclado.
   ========================================================================== */

(function () {
  "use strict";

  // Reúne, em ordem, todas as imagens marcadas com data-lightbox
  const triggers = Array.from(document.querySelectorAll("[data-lightbox]"));
  if (triggers.length === 0) return;

  const images = triggers.map((trigger) => {
    const img = trigger.querySelector("img");
    return {
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt") || "",
    };
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  let currentIndex = 0;
  let lastFocusedElement = null;

  /**
   * Exibe a imagem correspondente ao índice atual, com uma pequena
   * transição de opacidade para suavizar a troca.
   */
  function renderImage() {
    const item = images[currentIndex];
    lightboxImg.style.opacity = "0";

    window.setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxCaption.textContent = item.alt;
      lightboxImg.style.opacity = "1";
    }, 150);
  }

  function openLightbox(index) {
    currentIndex = index;
    lastFocusedElement = document.activeElement;
    renderImage();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    renderImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderImage();
  }

  // Associa cada elemento clicável ao seu índice na galeria
  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => openLightbox(index));
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Fecha ao clicar fora da imagem (na área escura do overlay)
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  // Navegação e fechamento via teclado
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;

    switch (event.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowRight":
        showNext();
        break;
      case "ArrowLeft":
        showPrev();
        break;
      default:
        break;
    }
  });
})();
