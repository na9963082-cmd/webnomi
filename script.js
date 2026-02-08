// WebDex Interactive Logic

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const mobileMenuBtn = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");
  const header = document.querySelector("header");

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Mobile menu animations
    links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `fade-up 0.5s ease forwards ${index / 7 + 0.3}s`;
        // Manually trigger fade-in logic for logic consistency
        link.style.opacity = "1";
        link.style.transform = "translateY(0)";
      }
    });
  });

  // Sticky Header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(15, 23, 42, 0.95)";
      header.style.padding = "0.5rem 0";
    } else {
      header.style.background = "rgba(15, 23, 42, 0.8)";
      header.style.padding = "1rem 0";
    }
  });

  // Scroll Active Link
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").includes(current)) {
        item.classList.add("active");
      }
    });
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate progress bars if this is the skills section
        if (entry.target.querySelector(".progress-fill")) {
          const progressBars = entry.target.querySelectorAll(".progress-fill");
          progressBars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            bar.style.width = width;
          });
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-up, .section-title, .service-card, .trust-item")
    .forEach((el) => {
      el.classList.add("fade-up"); // Ensure class exists
      observer.observe(el);
    });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      navLinks.classList.remove("active"); // Close mobile menu

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Robot Mouse Movement Effect
  const hero = document.querySelector('.hero');
  const robot = document.getElementById('robot');

  if (hero && robot) {
    hero.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
      robot.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
      robot.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close all other FAQs
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(faq => {
        faq.classList.remove('active');
      });
      
      // Toggle current FAQ
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Contact Form Simple Handler
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function() {
      // Form will submit via Web3Forms API
      // You can add custom success handling here if needed
      const formStatus = document.getElementById('form-status');
      if (formStatus) {
        formStatus.innerHTML = '<p style="color: var(--secondary);">Sending...</p>';
      }
    });
  }
});
