const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.closest(".faq-item")?.querySelector(".faq-answer");
    if (!answer) return;
    button.setAttribute("aria-expanded", String(!isExpanded));
    answer.hidden = isExpanded;
  });
});

const dateInput = document.querySelector('input[name="date"]');
if (dateInput instanceof HTMLInputElement) {
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  dateInput.min = localToday;
}

const appointmentForm = document.querySelector("#appointment-form");
const appointmentStatus = document.querySelector("#appointment-status");
const appointmentFallback = document.querySelector("#appointment-fallback");

if (
  appointmentForm instanceof HTMLFormElement &&
  appointmentStatus instanceof HTMLElement &&
  appointmentFallback instanceof HTMLAnchorElement
) {
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    appointmentStatus.textContent = "";
    appointmentFallback.hidden = true;

    if (!appointmentForm.reportValidity()) return;

    const formData = new FormData(appointmentForm);
    const fields = [
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      formData.get("email") ? `Email: ${formData.get("email")}` : "",
      `Service: ${formData.get("service")}`,
      `Preferred date: ${formData.get("date")}`,
      `Preferred time: ${formData.get("time")}`,
      formData.get("message") ? `Note: ${formData.get("message")}` : "",
    ].filter(Boolean);
    const message = `Hello, I would like to ask about an appointment.\n\n${fields.join("\n")}\n\nPlease confirm availability.`;
    const whatsappUrl = `https://wa.me/9779810019211?text=${encodeURIComponent(message)}`;
    appointmentFallback.href = whatsappUrl;
    appointmentFallback.hidden = false;
    appointmentStatus.textContent =
      "Your message is ready. WhatsApp will open for you to review and send it. Your appointment is not booked until DLDC confirms.";

    const whatsappWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (whatsappWindow) whatsappWindow.opener = null;
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const heroSection = document.querySelector(".hero");
const mobileCall = document.querySelector(".mobile-call");
if (heroSection && mobileCall instanceof HTMLAnchorElement) {
  if ("IntersectionObserver" in window) {
    const heroObserver = new IntersectionObserver(
      ([entry]) => mobileCall.classList.toggle("is-visible", !entry.isIntersecting),
      { threshold: 0.05 },
    );
    heroObserver.observe(heroSection);
  } else {
    mobileCall.classList.add("is-visible");
  }
}
