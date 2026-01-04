// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Hide loading screen
  setTimeout(() => {
    const loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() => {
      loading.style.display = 'none';
    }, 500);
  }, 1000);

  // Initialize components
  initNavbar();
  initBackToTop();
  initGallery();
  initContactForm();
  initAnimations();
  initCurrentYear();
  initSmoothScroll();
});

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Gallery initialization
function initGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  const loadMoreBtn = document.getElementById('loadMore');

  // Sample gallery data (replace with actual images)
  const allGalleryItems = [
    {
      title: 'تركيب نظام صوت BMW',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
    },
    {
      title: 'شاشة عرض مرسيدس',
      category: 'screen',
      image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
    },
    {
      title: 'تركيب إنذار حديث',
      category: 'alarm',
      image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
    },
    {
      title: 'صيانة نظام صوت',
      category: 'maintenance',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
    },
    {
      title: 'أنظمة ملاحة متطورة',
      category: 'navigation',
      image: 'https://images.unsplash.com/photo-1601042879364-f3947d1f9fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
    },
    {
      title: 'تعديل داخلي فاخر',
      category: 'interior',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
    },
    {
      title: 'سماعات سيارات',
      category: 'audio',
      image: 'https://images.unsplash.com/photo-1590649616891-1d0d618b8d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
    },
    {
      title: 'شاشة لمس حديثة',
      category: 'screen',
      image: 'https://images.unsplash.com/photo-1603584174147-8b5d0df12d19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80'
    }
  ];

  let visibleItems = 6;

  function renderGallery() {
    galleryContainer.innerHTML = '';
    const itemsToShow = allGalleryItems.slice(0, visibleItems);

    itemsToShow.forEach(item => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4 mb-4';
      col.setAttribute('data-aos', 'fade-up');

      col.innerHTML = `
                <div class="gallery-item">
                    <img src="${item.image}" alt="${item.title}" class="img-fluid gallery-img w-100">
                    <div class="gallery-overlay mt-2">
                        <h5 class="text-center">${item.title}</h5>
                    </div>
                </div>
            `;

      galleryContainer.appendChild(col);
    });

    // Show/hide load more button
    if (visibleItems >= allGalleryItems.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }
  }

  // Initial render
  renderGallery();

  // Load more functionality
  loadMoreBtn.addEventListener('click', () => {
    visibleItems += 3;
    renderGallery();
    // Re-initialize AOS for new elements
    AOS.refresh();
  });
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      service: document.getElementById('service').value,
      message: document.getElementById('message').value.trim()
    };

    // Validate form
    if (!formData.name) {
      showAlert('error', 'خطأ', 'يرجى إدخال الاسم الكامل');
      return;
    }

    if (!formData.phone || !/^[\+]?[0-9]{10,15}$/.test(formData.phone)) {
      showAlert('error', 'خطأ', 'يرجى إدخال رقم هاتف صحيح');
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showAlert('error', 'خطأ', 'يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    if (!formData.message) {
      showAlert('error', 'خطأ', 'يرجى كتابة الرسالة');
      return;
    }

    // Show loading
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> جاري الإرسال...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // In production, send data to server here
      // const apiUrl = 'your-api-endpoint';
      // fetch(apiUrl, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(formData)
      // })
      // .then(response => response.json())
      // .then(data => {
      //     // Handle success
      // })
      // .catch(error => {
      //     // Handle error
      // });

      // Reset form
      contactForm.reset();

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Show success message
      showAlert('success', 'تم الإرسال بنجاح', 'شكراً لتواصلك معنا، سنرد عليك في أقرب وقت ممكن');

      // Log form data (for testing)
      console.log('Form submitted:', formData);

      // Send email notification (simulated)
      sendEmailNotification(formData);
    }, 2000);
  });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
          const navbarToggler = document.querySelector('.navbar-toggler');
          navbarToggler.click();
        }

        // Update active nav link
        updateActiveNavLink(this);

        // Scroll to target
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavOnScroll);
}

// Update active navigation link on scroll
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Update active navigation link
function updateActiveNavLink(clickedLink) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  clickedLink.classList.add('active');
}

// Initialize animations
function initAnimations() {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
  });
}

// Show alert/modal
function showAlert(icon, title, text) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: 'حسناً',
    confirmButtonColor: '#003a74',
    timer: 3000,
    timerProgressBar: true
  });
}

// Initialize current year in footer
function initCurrentYear() {
  const currentYear = new Date().getFullYear();
  document.getElementById('currentYear').textContent = currentYear;
}

// Send email notification (simulated)
function sendEmailNotification(formData) {
  // In production, integrate with email service like EmailJS, SendGrid, etc.
  console.log('Sending email notification:', formData);

  // Example with EmailJS (uncomment and configure)
  /*
  emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      from_name: formData.name,
      from_email: formData.email || 'no-email@provided.com',
      phone: formData.phone,
      service: formData.service,
      message: formData.message
  })
  .then(function(response) {
      console.log('Email sent successfully:', response);
  }, function(error) {
      console.log('Failed to send email:', error);
  });
  */
}

// Phone click handler
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', function (e) {
    if (window.innerWidth > 768) { // Desktop
      e.preventDefault();
      const phone = this.href.replace('tel:', '');
      Swal.fire({
        title: 'اتصال هاتفي',
        text: `هل تريد الاتصال بالرقم ${phone}؟`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'اتصال',
        cancelButtonText: 'إلغاء',
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = `tel:${phone}`;
        }
      });
    }
    // On mobile, let the default behavior happen
  });
});

// WhatsApp click handler
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
  link.addEventListener('click', function (e) {
    // Add analytics or tracking here
    console.log('WhatsApp link clicked');
  });
});

// Form validation helper
function validatePhoneNumber(phone) {
  const regex = /^[\+]?[0-9]{10,15}$/;
  return regex.test(phone);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Add scroll reveal animations
function initScrollReveal() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// Initialize when page loads
window.addEventListener('load', () => {
  initScrollReveal();
});