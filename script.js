const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
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
