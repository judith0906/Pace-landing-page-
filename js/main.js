/* ==========================================================================
   Pace Landing — JS
   Objetivo: pequeñas mejoras UX sin dependencias:
   - Menú móvil accesible (aria-expanded + cierre al navegar)
   - Año automático del footer
   - FAQ: cerrar otros items (opcional) para que no quede enorme
   - Aviso si aún no has puesto links reales de store
   ========================================================================== */

   (function () {
    const header = document.querySelector("[data-header]");
    const nav = document.querySelector("[data-nav]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const year = document.querySelector("[data-year]");
    const faq = document.querySelector("[data-faq]");
  
    // Año en footer
    if (year) year.textContent = String(new Date().getFullYear());
  
    // Menú móvil
    if (nav && toggle) {
      const setOpen = (open) => {
        nav.classList.toggle("is-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        document.body.style.overflow = open ? "hidden" : "";
      };
  
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.contains("is-open");
        setOpen(!isOpen);
      });
  
      // Cierra el menú al hacer click en un enlace
      nav.addEventListener("click", (e) => {
        const target = e.target;
        if (target && target.matches("a[href^='#']")) setOpen(false);
      });
  
      // Cierra al pulsar Escape
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setOpen(false);
      });
  
      // Cierra si cambia a layout desktop (por resize)
      window.addEventListener("resize", () => {
        if (window.innerWidth > 960) setOpen(false);
      });
    }
  
    // FAQ: opción “acordeón” (solo 1 abierto a la vez)
    if (faq) {
      faq.addEventListener("toggle", (e) => {
        const item = e.target;
        if (!(item instanceof HTMLDetailsElement)) return;
        if (!item.open) return;
  
        const all = faq.querySelectorAll("details");
        all.forEach((d) => {
          if (d !== item) d.open = false;
        });
      });
    }
  
    // Detecta links placeholder (#) en botones de descarga
    const storeButtons = document.querySelectorAll("[data-store]");
    storeButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const href = btn.getAttribute("href");
        if (!href || href === "#") {
          e.preventDefault();
          alert(
            "Proximamente descargable en Google Play."
          );
        }
    });
  });
})();