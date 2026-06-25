// BOMBOM Portfolio - script.js

document.addEventListener('DOMContentLoaded', function () {
  // Sticky header toggle
  const header = document.getElementById('header');
  const stickyClass = 'is-sticky';
  
  const handleScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add(stickyClass);
    } else {
      header.classList.remove(stickyClass);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger on load in case page starts scrolled

  // Hamburger menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.getElementById('nav-list');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!isExpanded));
      navList.classList.toggle('open');
      
      // Prevent body scrolling when mobile menu is open
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Close menu when clicking a link (mobile navigation flow)
  const navLinks = document.querySelectorAll('.gnb-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (navList.classList.contains('open')) {
        navList.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Smooth Scroll Reveal Interaction
  const revealElements = document.querySelectorAll('.reveal-item');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Contact Form HTML validation UX
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // We only apply HTML required validation and prevent actual sending as per settings
      e.preventDefault();
      
      if (!this.checkValidity()) {
        this.reportValidity();
      } else {
        alert('문의가 성공적으로 접수되었습니다. (데모 제출 완료)');
        this.reset();
      }
    });
  }

  // ==== Custom Cursor JavaScript Integration ====
  const cursor = document.querySelector('.custom-cursor');
  
  if (cursor && window.matchMedia('(min-width: 1025px)').matches) {
    // Show cursor on initial movement
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (!cursor.classList.contains('is-visible')) {
        cursor.classList.add('is-visible');
      }
    });

    // Hide cursor when leaving page
    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-visible');
    });

    document.addEventListener('mouseenter', () => {
      cursor.classList.add('is-visible');
    });

    // Hover elements selectors
    const hoverSelectors = 'a, button, .btn, .gnb-link, .project-showcase, .services-item-row, .about-editorial__block, .why-editorial-item, .process-timeline-item';
    const hoverTargets = document.querySelectorAll(hoverSelectors);
    
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hover');
      });
      target.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hover');
      });
    });

    // Distinct cursor shape for input elements (textarea / text fields)
    const inputTargets = document.querySelectorAll('input, textarea');
    inputTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        cursor.classList.add('is-input-hover');
      });
      target.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-input-hover');
      });
    });
  }
});
