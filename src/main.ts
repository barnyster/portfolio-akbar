import './style.css'

// Initialize portfolio functionality
document.addEventListener('DOMContentLoaded', () => {
  console.log('Barnyster Portfolio loaded successfully!');
  
  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Beachfront Luxury Wedding",
      category: "wedding",
      description: "Exclusive wedding ceremony with 300 guests at a premium beach resort",
      year: 2024
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      category: "corporate",
      description: "Annual technology conference with 100+ speakers and 2,000+ participants",
      year: 2023
    },
    {
      id: 3,
      title: "Sunset Music Festival 2024",
      category: "festival",
      description: "3-day outdoor music festival with 50+ artists and 5,000+ attendees",
      year: 2024
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Ahmad Syah",
      role: "CEO, TechCorp Indonesia",
      content: "Barnyster transformed our annual conference into an unforgettable experience.",
      rating: 5
    },
    {
      id: 2,
      name: "Sari Ratna",
      role: "Wedding Client",
      content: "Our wedding was absolutely perfect thanks to Barnyster!",
      rating: 5
    },
    {
      id: 3,
      name: "Dewi Rahayu",
      role: "Marketing Director, GlobalFest",
      content: "Working with Barnyster on our music festival was a game-changer.",
      rating: 5
    }
  ];
  
  // Initialize counters
  const initializeCounters = () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target') || '0');
      const suffix = counter.getAttribute('data-suffix') || '';
      animateCounter(counter as HTMLElement, target, suffix);
    });
  };
  
  // Animate counter
  const animateCounter = (element: HTMLElement, target: number, suffix: string) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 20);
  };
  
  // Initialize portfolio filter
  const initializePortfolioFilter = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function(this: HTMLElement) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
          btn.classList.remove('active', 'bg-cyan-500', 'text-white');
          btn.classList.add('bg-gray-800', 'text-gray-300');
        });
        
        // Add active class to clicked button
        this.classList.remove('bg-gray-800', 'text-gray-300');
        this.classList.add('active', 'bg-cyan-500', 'text-white');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.classList.add('opacity-100');
              item.classList.remove('opacity-0');
            }, 10);
          } else {
            item.classList.add('opacity-0');
            setTimeout(() => {
              item.classList.add('hidden');
            }, 300);
          }
        });
      });
    });
  };
  
  // Form validation
  const initializeContactForm = () => {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      
      // Get form elements
      const nameInput = contactForm.querySelector('input[type="text"]') as HTMLInputElement;
      const emailInput = contactForm.querySelector('input[type="email"]') as HTMLInputElement;
      const messageInput = contactForm.querySelector('textarea') as HTMLTextAreaElement;
      
      // Validate form
      let isValid = true;
      const errors: string[] = [];
      
      if (!nameInput.value.trim()) {
        isValid = false;
        errors.push('Name is required');
        nameInput.classList.add('border-red-500');
      } else {
        nameInput.classList.remove('border-red-500');
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        isValid = false;
        errors.push('Valid email is required');
        emailInput.classList.add('border-red-500');
      } else {
        emailInput.classList.remove('border-red-500');
      }
      
      if (!messageInput.value.trim()) {
        isValid = false;
        errors.push('Message is required');
        messageInput.classList.add('border-red-500');
      } else {
        messageInput.classList.remove('border-red-500');
      }
      
      if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
          // Show success message
          showNotification('Message sent successfully! I will get back to you within 24 hours.', 'success');
          
          // Reset form
          contactForm.reset();
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }, 2000);
      } else {
        // Show error message
        showNotification('Please fill in all required fields correctly.', 'error');
      }
    });
  };
  
  // Email validation helper
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Show notification
  const showNotification = (message: string, type: 'success' | 'error') => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg transform transition-transform duration-300 translate-x-full ${
      type === 'success' ? 'bg-green-900/90 border border-green-700' : 'bg-red-900/90 border border-red-700'
    }`;
    
    notification.innerHTML = `
      <div class="flex items-center">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-3 text-lg ${
      type === 'success' ? 'text-green-400' : 'text-red-400'
    }"></i>
        <p class="text-white">${message}</p>
      </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.remove('translate-x-full');
      notification.classList.add('translate-x-0');
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('translate-x-0');
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  };
  
  // Initialize smooth scroll for anchor links
  const initializeSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          const mobileMenu = document.getElementById('mobile-menu');
          if (mobileMenu) {
            mobileMenu.classList.add('hidden');
          }
          
          // Scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Update URL
          history.pushState(null, '', targetId);
        }
      });
    });
  };
  
  // Initialize mobile menu
  const initializeMobileMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!mobileMenu.contains(target) && !menuToggle.contains(target) && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      });
    }
  };
  
  // Initialize back to top button
  const initializeBackToTop = () => {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.remove('hidden');
        } else {
          backToTopButton.classList.add('hidden');
        }
      });
      
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };
  
  // Initialize everything
  const initializeApp = () => {
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeBackToTop();
    initializePortfolioFilter();
    initializeContactForm();
    
    // Animate counters on page load
    setTimeout(() => {
      const eventsCounter = document.getElementById('eventsCounter');
      const satisfactionCounter = document.getElementById('satisfactionCounter');
      const experienceCounter = document.getElementById('experienceCounter');
      
      if (eventsCounter) animateCounter(eventsCounter, 50, '+');
      if (satisfactionCounter) animateCounter(satisfactionCounter, 100, '%');
      if (experienceCounter) animateCounter(experienceCounter, 5, '+');
    }, 1000);
  };
  
  // Start the application
  initializeApp();
  
  // Log initialization
  console.log('Portfolio application initialized successfully!');
});