// ==========================================
// JTWM TAX SERVICES LLC
// NAVIGATION
// ==========================================


const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav__link");

function closeMenu() {
  navMenu.classList.remove("show-menu");

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation menu");

  navToggle.innerHTML = `
    <i class="fa-solid fa-bars" aria-hidden="true"></i>
  `;
}

// Open / close mobile navigation
navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("show-menu");

  navToggle.setAttribute("aria-expanded", String(isOpen));

  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  navToggle.innerHTML = isOpen
    ? `<i class="fa-solid fa-xmark" aria-hidden="true"></i>`
    : `<i class="fa-solid fa-bars" aria-hidden="true"></i>`;
});

// Close mobile menu when a navigation link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();

    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Close menu when clicking outside the navigation
document.addEventListener("click", (event) => {
  if (
    navMenu.classList.contains("show-menu") &&
    !event.target.closest(".nav")
  ) {
    closeMenu();
  }
});

// Close menu when pressing Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Reset mobile menu when switching to desktop width
window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    closeMenu();
  }
});

// ==========================================
// FAQ ACCORDION
// ==========================================

const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((currentItem) => {
  currentItem.addEventListener("toggle", () => {
    if (!currentItem.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== currentItem) {
        otherItem.open = false;
      }
    });
  });
});

// ==========================================
// CONTACT FORM — LIVE SUBMISSIONS
// ==========================================

const contactForm = document.getElementById("contact-form");
const contactFormStatus = document.getElementById("contact-form-status");

if (contactForm && contactFormStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(
      'button[type="submit"]'
    );

    submitButton.disabled = true;
    contactFormStatus.textContent = "Sending your inquiry...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      contactFormStatus.textContent =
        "Thank you! Your inquiry has been sent successfully.";

      contactForm.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      contactFormStatus.textContent =
        "Sorry, your message could not be sent. Please try again or contact us directly.";
    } finally {
      submitButton.disabled = false;
    }
  });
}

// ==========================================
// BOOKING — CALENDLY INTEGRATION
// ==========================================

// Leave empty until Jacqueline's booking account is ready.
const CALENDLY_URL = "https://calendly.com/jtwmtaxservices/30min";

const bookingPending = document.getElementById("booking-pending");
const bookingCalendar = document.getElementById("booking-calendar");
const bookingBackup = document.getElementById("booking-backup");
const bookingExternalLink = document.getElementById(
  "booking-external-link"
);

function initializeBooking() {
  // No real booking URL yet — show the coming-soon state.
  if (!CALENDLY_URL) {
    return;
  }

  // Accept only a valid Calendly HTTPS URL.
  let bookingUrl;

  try {
    bookingUrl = new URL(CALENDLY_URL);

    if (
      bookingUrl.protocol !== "https:" ||
      bookingUrl.hostname !== "calendly.com"
    ) {
      throw new Error("Invalid Calendly URL");
    }
  } catch (error) {
    console.error("Please configure a valid Calendly URL.");
    return;
  }

  // Set up the backup link.
  bookingExternalLink.href = bookingUrl.href;
  bookingBackup.hidden = false;

  // Create the embedded calendar.
  const widget = document.createElement("div");
  widget.className = "calendly-inline-widget";
  widget.dataset.url = bookingUrl.href;

  bookingCalendar.replaceChildren(widget);
  bookingCalendar.hidden = false;
  bookingPending.hidden = true;

  // Load Calendly's official embed script.
  const script = document.createElement("script");
  script.src =
    "https://assets.calendly.com/assets/external/widget.js";
  script.async = true;

  script.onerror = () => {
    console.error("Calendly calendar failed to load.");

    bookingCalendar.hidden = true;
    bookingPending.hidden = false;
  };

  document.body.appendChild(script);
}

initializeBooking();

// ==========================================
// FOOTER — AUTOMATIC COPYRIGHT YEAR
// ==========================================

const footerYear = document.getElementById("footer-year");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

