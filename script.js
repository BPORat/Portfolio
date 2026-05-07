// Decisión de diseño: mantener este archivo pequeño y enfocado.
// Cada bloque tiene una responsabilidad clara.

// ----------------------
// Utilidades
// ----------------------

/**
 * Devuelve un elemento por su id.
 * Prefiero esta pequeña utilidad para evitar repetir document.getElementById.
 */
function $(id) {
  return document.getElementById(id);
}

// ----------------------
// Tema (oscuro / claro)
// ----------------------

const themeToggleBtn = $("themeToggle");
const root = document.documentElement;

// Cargar tema guardado
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  themeToggleBtn.textContent = savedTheme === "light" ? "Modo oscuro" : "Modo claro";
}

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  themeToggleBtn.textContent = nextTheme === "light" ? "Modo oscuro" : "Modo claro";
});

// ----------------------
// Modal de proyectos
// ----------------------

const projectDetailsButtons = document.querySelectorAll(".project-card__details");
const modal = $("projectModal");
const modalTitle = $("modalTitle");
const modalDescription = $("modalDescription");
const modalHighlights = $("modalHighlights");
const modalClose = $("modalClose");

// Información de proyectos (aquí se ve tu criterio, no es genérico)
const projectData = {
  taskflow: {
    title: "TaskFlow",
    description:
      "TaskFlow nació de una necesidad personal: dejar de usar notas sueltas para organizar mi día. El foco está en la simplicidad y en no abrumar al usuario.",
    highlights: [
      "Filtros por prioridad, estado y categoría.",
      "Modo oscuro con preferencia guardada en localStorage.",
      "Código organizado en módulos pequeños y funciones con una sola responsabilidad.",
    ],
  },
  mercadomini: {
    title: "MercadoMini",
    description:
      "MercadoMini es un mini e‑commerce pensado para practicar lógica de negocio: impuestos, stock y carrito persistente.",
    highlights: [
      "Carrito que se mantiene entre sesiones usando localStorage.",
      "Cálculo de impuestos según región simulada.",
      "Componentes reutilizables y separación clara entre UI y lógica.",
    ],
  },
  climalocal: {
    title: "ClimaLocal",
    description:
      "ClimaLocal surgió como ejercicio para consumir APIs y manejar errores de forma honesta con el usuario.",
    highlights: [
      "Consumo de una API de clima con manejo de errores de red.",
      "Ciudades favoritas guardadas localmente.",
      "Mensajes claros cuando algo falla (en lugar de errores genéricos).",
    ],
  },
};

function openProjectModal(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;

  // Limpiar lista anterior
  modalHighlights.innerHTML = "";

  data.highlights.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalHighlights.appendChild(li);
  });

  modal.classList.remove("modal--hidden");
}

function closeProjectModal() {
  modal.classList.add("modal--hidden");
}

projectDetailsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const projectKey = btn.dataset.project;
    openProjectModal(projectKey);
  });
});

modalClose.addEventListener("click", closeProjectModal);

modal.addEventListener("click", (event) => {
  // Cerrar si se hace clic fuera del contenido
  if (event.target === modal) {
    closeProjectModal();
  }
});

// ----------------------
// Formulario de contacto
// ----------------------

const contactForm = $("contactForm");
const formFeedback = $("formFeedback");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  // Validación simple pero con intención
  if (!name || !email || !message) {
    formFeedback.textContent = "Por favor completa todos los campos.";
    formFeedback.style.color = "var(--danger)";
    return;
  }

  // Aquí normalmente enviarías los datos a un backend o servicio de correo.
  // Para el portafolio, basta con simular el envío.
  formFeedback.textContent = "Gracias por tu mensaje. Te responderé lo antes posible.";
  formFeedback.style.color = "var(--accent)";

  contactForm.reset();
});

// ----------------------
// Año en el footer
// ----------------------

$("year").textContent = new Date().getFullYear();
