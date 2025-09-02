// Website Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation links and pages
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // Function to show specific page
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show the target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Add active class to corresponding nav link
        const activeNavLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update URL hash without triggering scroll
        history.pushState(null, null, `#${pageId}`);
    }
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Add click event listeners to footer links that correspond to pages
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const pageId = href.substring(1);
                showPage(pageId);
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showPage(hash);
        } else {
            showPage('about'); // Default to about page
        }
    });
    
    // Check initial URL hash and show appropriate page
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showPage(initialHash);
    } else {
        showPage('about'); // Default to about page
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            const targetElement = document.querySelector(href);
            if (targetElement && !this.hasAttribute('data-page')) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation effects on scroll
    function addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.testimonial-card, .rob-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations
    addScrollAnimations();
    
    // Mobile menu toggle functionality
    function initMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        
        // Add mobile menu button if screen is small
        if (window.innerWidth <= 768) {
            // Create mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileBtn = document.createElement('button');
                mobileBtn.className = 'mobile-menu-btn';
                mobileBtn.innerHTML = '☰';
                mobileBtn.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: #333;
                    cursor: pointer;
                    display: block;
                `;
                
                document.querySelector('.nav-container').appendChild(mobileBtn);
                
                mobileBtn.addEventListener('click', function() {
                    navMenu.classList.toggle('mobile-active');
                });
            }
        }
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Reinitialize on window resize
    window.addEventListener('resize', initMobileMenu);
    
    // Form submission handler for contact page
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.btn-primary');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get form inputs
                const nameInput = contactForm.querySelector('input[placeholder="Your Name"]');
                const emailInput = contactForm.querySelector('input[placeholder="Your Email"]');
                const messageInput = contactForm.querySelector('textarea[placeholder="Your Message"]');
                
                // Simple validation
                if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                    alert('Please fill in all fields');
                    return;
                }
                
                // Simulate form submission
                this.textContent = 'Sending...';
                this.disabled = true;
                
                setTimeout(() => {
                    alert('Message sent successfully!');
                    nameInput.value = '';
                    emailInput.value = '';
                    messageInput.value = '';
                    this.textContent = 'Send Message';
                    this.disabled = false;
                }, 1500);
            });
        }
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.testimonial-card, .rob-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
    
});

// buku
  let currentIndex = 0;
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    function showSlide(index) {
      if (index < 0) currentIndex = totalSlides - 1;
      else if (index >= totalSlides) currentIndex = 0;
      else currentIndex = index;

      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function prevSlide() {
      showSlide(currentIndex - 1);
    }

    // service
function handleLearnMore(serviceName) {
            // Simple click handler without heavy animations
            alert(`Interested in ${serviceName}? This would typically redirect to a detailed page or open a contact form.`);
        }

        // Lightweight load animation
        document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.card');
            
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 80);
            });
        });

// testimony
   const counters = document.querySelectorAll('.value');

    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    function animateCounter(el){
      const target = Number(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1300; // ms
      const start = performance.now();

      function step(now){
        const p = Math.min(1, (now - start) / duration);
        const eased = easeOutCubic(p);
        const val = Math.round(target * eased);
        el.textContent = val.toLocaleString() + suffix;
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    // Jalankan sekali saat masuk viewport
    const once = new Set();
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting && !once.has(entry.target)){
          once.add(entry.target);
          animateCounter(entry.target);
        }
      })
    }, { threshold: 0.6 });

    counters.forEach(c => io.observe(c));