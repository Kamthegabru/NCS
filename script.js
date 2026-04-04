const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroRotator = document.querySelector(".hero-rotator");
const siteHeader = document.querySelector(".site-header");
const contactForm = document.querySelector(".lead-form");
const formStatus = document.querySelector("#form-status");

if (heroSlides.length && heroDots.length) {
  let activeIndex = 0;
  let sliderTimer;

  const showSlide = (index) => {
    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });

    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });

    activeIndex = index;
  };

  const startSlider = () => {
    sliderTimer = window.setInterval(() => {
      const nextIndex = (activeIndex + 1) % heroSlides.length;
      showSlide(nextIndex);
    }, 4500);
  };

  const resetSlider = () => {
    window.clearInterval(sliderTimer);
    startSlider();
  };

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      resetSlider();
    });
  });

  startSlider();
}

if (heroRotator) {
  const terms = (heroRotator.dataset.terms || "")
    .split("|")
    .map((term) => term.trim())
    .filter(Boolean);

  if (terms.length > 1) {
    let activeTermIndex = 0;

    window.setInterval(() => {
      activeTermIndex = (activeTermIndex + 1) % terms.length;
      heroRotator.classList.add("is-changing");

      window.setTimeout(() => {
        heroRotator.textContent = terms[activeTermIndex];
        heroRotator.classList.remove("is-changing");
      }, 180);
    }, 2200);
  }
}

if (siteHeader) {
  const syncHeaderState = () => {
    siteHeader.classList.toggle("is-compact", window.scrollY > 24);
  };

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formData = new FormData(contactForm);

    formStatus.textContent = "Sending your request...";
    formStatus.className = "form-status";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      window.location.href = "thanks.html";
    } catch (error) {
      formStatus.textContent = "The form could not be submitted right now. Please try again or contact us directly.";
      formStatus.className = "form-status is-error";

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Request";
      }
    }
  });
}
