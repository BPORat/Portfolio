// Utilidad para obtener elementos rápido
function $(id) {
  return document.getElementById(id);
}

// ----------------------
// Tema oscuro / claro
// ----------------------
const themeToggleBtn = $("themeToggle");
const root = document.documentElement;

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

const projectData = {
  taskflow: {
    title: "TaskFlow",
    description:
      "TaskFlow nació de una necesidad personal: dejar de usar notas sueltas para organizar mi día.",
    highlights: [
      "Filtros por prioridad, estado y categoría.",
      "Modo oscuro con preferencia guardada.",
      "Código organizado en funciones pequeñas."
    ],
  },
  mercadomini: {
    title: "MercadoMini",
    description:
      "Mini e‑commerce pensado para practicar lógica de negocio: impuestos, stock y carrito persistente.",
    highlights: [
      "Carrito persistente con localStorage.",
      "Cálculo de impuestos según región.",
      "Componentes reutilizables."
    ],
  },
  climalocal: {
    title: "ClimaLocal",
    description:
      "App del clima con API, ciudades favoritas y manejo de errores realista.",
    highlights: [
      "Consumo de API con manejo de errores.",
      "Ciudades favoritas guardadas localmente.",
      "Mensajes claros cuando algo falla."
    ],
  },
};

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

function closeProjectModal() {
  modal.classList.add("modal--hidden");
}

projectDetailsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    openProjectModal(btn.dataset.project);
  });
});

modalClose.addEventListener("click", closeProjectModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeProjectModal();
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

  if (!name || !email || !message) {
    formFeedback.textContent = "Por favor completa todos los campos.";
    formFeedback.style.color = "var(--danger)";
    return;
  }

  formFeedback.textContent = "Gracias por tu mensaje. Te responderé pronto.";
  formFeedback.style.color = "var(--accent)";
  contactForm.reset();
});

// Año dinámico
$("year").textContent = new Date().getFullYear();
