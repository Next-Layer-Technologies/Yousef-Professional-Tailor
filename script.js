// Custom JavaScript for Yousef Professional Tailor

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Active navigation highlighting
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

    let current = ""
    const headerHeight = document.querySelector(".navbar").offsetHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav)

  // Initial call
  updateActiveNav()

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements and observe them
  // Modified to include .gallery-item-wrapper
  const animateElements = document.querySelectorAll(".card, .feature-icon, .gallery-item-wrapper, .contact-info > div")
  animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Form handling
  const appointmentForm = document.getElementById("appointmentForm")
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      // Show loading state
      submitBtn.classList.add("btn-loading")
      submitBtn.disabled = true

      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        // Reset form
        this.reset()

        // Reset button
        submitBtn.classList.remove("btn-loading")
        submitBtn.disabled = false
        submitBtn.textContent = "Appointment Scheduled!"
        submitBtn.classList.remove("btn-warning")
        submitBtn.classList.add("btn-success")

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText
          submitBtn.classList.remove("btn-success")
          submitBtn.classList.add("btn-warning")
        }, 3000)

        // Show success message
        showNotification("Appointment request submitted successfully! We will contact you soon.", "success")
      }, 2000)
    })
  }

  // Gallery lightbox effect (simple version)
  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img")
      const modal = createImageModal(img.src, img.alt)
      document.body.appendChild(modal)

      // Show modal
      setTimeout(() => {
        modal.classList.add("show")
      }, 10)
    })
  })

  // Call Now button functionality - Corrected selector
  const headerCallNowBtn = document.getElementById('headerCallNowBtn');
  if (headerCallNowBtn) {
    headerCallNowBtn.addEventListener("click", () => {
      const callModal = new bootstrap.Modal(document.getElementById('callNowModal'));
      callModal.show();
    });
  }


  // Mobile menu close on link click
  const mobileNavLinks = document.querySelectorAll(".navbar-nav .nav-link")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    })
  })

  // Gallery "View More" functionality
  const galleryItemWrappers = document.querySelectorAll('#galleryContainer .gallery-item-wrapper');
  const viewMoreBtn = document.getElementById('viewMoreGalleryBtn');
  const itemsToShowInitially = 6; // Number of images to show at first
  const itemsPerLoad = 3; // Number of additional images to show per click

  // Hide items beyond the initial count
  for (let i = itemsToShowInitially; i < galleryItemWrappers.length; i++) {
    galleryItemWrappers[i].classList.add('d-none');
  }

  // Show/hide view more button based on total items
  if (galleryItemWrappers.length <= itemsToShowInitially) {
    viewMoreBtn.style.display = 'none';
  }

  let currentlyShownItems = itemsToShowInitially;

  viewMoreBtn.addEventListener('click', () => {
    const nextBatchEnd = Math.min(currentlyShownItems + itemsPerLoad, galleryItemWrappers.length);

    for (let i = currentlyShownItems; i < nextBatchEnd; i++) {
      galleryItemWrappers[i].classList.remove('d-none');
      // Re-observe for fade-in animation if it's a newly visible element
      observer.observe(galleryItemWrappers[i]);
    }

    currentlyShownItems = nextBatchEnd;

    // Hide the button if all items are shown
    if (currentlyShownItems >= galleryItemWrappers.length) {
      viewMoreBtn.style.display = 'none';
    }
  });
});

// Utility function to create image modal
function createImageModal(src, alt) {
  const modal = document.createElement("div")
  modal.className = "modal fade"
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `

  modal.innerHTML = `
        <div style="position: relative; max-width: 90%; max-height: 90%;">
            <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            <button onclick="this.closest('.modal').remove()"
                    style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 30px; cursor: pointer;">
                ×
            </button>
        </div>
    `

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })

  return modal
}

// Utility function to show notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type === "success" ? "success" : "info"} alert-dismissible fade show`
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `

  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(30, 41, 59, 0.95)"
    navbar.style.backdropFilter = "blur(10px)"
  } else {
    navbar.style.backgroundColor = "var(--primary-color)"
    navbar.style.backdropFilter = "none"
  }
})

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], select[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("is-invalid")
      isValid = false
    } else {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
    }
  })

  return isValid
}

// Email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Phone validation
function validatePhone(phone) {
  const re = /^[+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/\s/g, ""))
}