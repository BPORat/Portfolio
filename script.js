// -------------------------------------------------------------
// Utilidades simples
// -------------------------------------------------------------

/**
 * Atajo para obtener elementos por ID.
 */
function $(id) {
  return document.getElementById(id);
}

// -------------------------------------------------------------
// Tema oscuro / claro
// -------------------------------------------------------------
const themeToggleBtn = $("themeToggle");
const root = document.documentElement;

// Cargar tema guardado previamente
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeToggleBtn.textContent =
    savedTheme === "light" ? "Modo oscuro" : "Modo claro";
}

// Alternar tema
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);

  themeToggleBtn.textContent =
    nextTheme === "light" ? "Modo oscuro" : "Modo claro";
});

// -------------------------------------------------------------
// Scroll Reveal — Animaciones avanzadas al hacer scroll
// -------------------------------------------------------------
const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// -------------------------------------------------------------
// Modal de proyectos
// -------------------------------------------------------------
const projectDetailsButtons = document.querySelectorAll(
  ".project-card__details"
);
const modal = $("projectModal");
const modalTitle = $("modalTitle");
const modalDescription = $("modalDescription");
const modalHighlights = $("modalHighlights");
const modalClose = $("modalClose");

/**
 * Información de proyectos.
 */
const projectData = {
  taskflow: {
    title: "TaskFlow",
    description:
      "TaskFlow nació de una necesidad personal: organizar mis tareas sin depender de apps recargadas.",
    highlights: [
      "Filtros por prioridad, estado y categoría.",
      "Modo oscuro persistente con localStorage.",
      "Funciones pequeñas y responsabilidades claras.",
    ],
  },

  mercadomini: {
    title: "MercadoMini",
    description:
      "Mini e‑commerce creado para practicar lógica de negocio real: stock, impuestos y persistencia del carrito.",
    highlights: [
      "Carrito persistente entre sesiones.",
      "Cálculo de impuestos según región.",
      "Componentes reutilizables.",
    ],
  },

  climalocal: {
    title: "ClimaLocal",
    description:
      "App del clima enfocada en UX: manejo de errores claro, ciudades favoritas y datos en tiempo real.",
    highlights: [
      "Consumo de API con manejo de errores realista.",
      "Ciudades favoritas guardadas localmente.",
      "Mensajes claros cuando algo falla.",
    ],
  },
};

/**
 * Abre el modal con la información del proyecto seleccionado.
 */
function openProjectModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;

  modalHighlights.innerHTML = "";
  data.highlights.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalHighlights.appendChild(li);
  });

  modal.classList.remove("modal--hidden");
}

/**
 * Cierra el modal.
 */
function closeProjectModal() {
  modal.classList.add("modal--hidden");
}

// Eventos para abrir modal
projectDetailsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    openProjectModal(btn.dataset.project);
  });
});

// Cerrar modal con botón
modalClose.addEventListener("click", closeProjectModal);

// Cerrar modal haciendo clic fuera del contenido
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProjectModal();
});

// -------------------------------------------------------------
// Formulario de contacto
// -------------------------------------------------------------
const contactForm = $("contactForm");
const formFeedback = $("formFeedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formFeedback.textContent = "Por favor completa todos los campos.";
    formFeedback.style.color = "var(--accent-hover)";
    return;
  }

  formFeedback.textContent =
    "Gracias por tu mensaje. Te responderé lo antes posible.";
  formFeedback.style.color = "var(--accent)";

  contactForm.reset();
});

// -------------------------------------------------------------
// Año dinámico
// -------------------------------------------------------------
$("year").textContent = new Date().getFullYear();
